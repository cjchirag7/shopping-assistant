import json
import string
import random
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import PunktSentenceTokenizer
import sklearn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from recommender.sunglasses_recommendor import recommend_sunglasses
from recommender.clothes_recommendor import recommend_cloth

def download_ntlk_stopwords():
    try:
        nltk.data.find('corpora/stopwords')
    except LookupError:
        nltk.download('stopwords')

nltk.download('punkt') 
download_ntlk_stopwords()
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet') 
nltk.download('nps_chat')

# Global Constants
GREETING_INPUTS    = ("hello", "hi","wassup", "hey","holla", "hello","namaste","namastey")
GREETING_RESPONSES = ["hi, how may I help you?", "hey, feel free to ask me anything about any product.", "hi there, I will be happy to help you"]

# Global Variables
lem = nltk.stem.WordNetLemmatizer()
remove_punctuation = dict((ord(punct), None) for punct in string.punctuation)

#Functions
'''
fetch_features transforms a chat into a classifier friendly format
'''
def fetch_features(chat):
    features = {}
    for word in nltk.word_tokenize(chat):
        features['contains({})'.format(word.lower())] = True
    return features
'''
lemmatise performs lemmatization on words
'''
def lemmatise(tokens):
    return [lem.lemmatize(token) for token in tokens]
  
'''
tokenise tokenizes the words
'''
def tokenise(text):
    return lemmatise(nltk.word_tokenize(text.lower().translate(remove_punctuation)))

'''
Standard greeting responses that the bot can recognize and respond with
'''
def greet(sentence):
    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)
'''
match matches a user input to the existing set of questions
'''
def match(user_response):
    resp      =''
    q_list.append(user_response)
    TfidfVec  = TfidfVectorizer(tokenizer=tokenise, stop_words='english')
    tfidf     = TfidfVec.fit_transform(q_list)
    vals      = cosine_similarity(tfidf[-1], tfidf)
    idx       = vals.argsort()[0][-2]
    flat      = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if(req_tfidf==0):
        if(greet(user_response)!=None):
            resp=greet(user_response)
        else:
            resp = resp+"Sorry! I am unable to understand this. Would you like to try again?"
        return resp
    else:
        resp_json = qa_dict[idx]
        if(resp_json['type']=='suggestion'):
            if(resp_json['product']=='sunglasses'):
                resp_json['preferred']=recommend_sunglasses()
            else:
                resp_json['preferred']=recommend_cloth()
        return resp_json

## Fetching questions

def get_question(q):
  ques = q['question'].lower()
  ques = "".join([char for char in ques if char not in string.punctuation]) 
  return ques

qa_dict = json.loads(open("./chatbot/questions.json").read())

q_list=list(map(get_question,qa_dict))

def get_response(u_input):
  u_input = u_input.lower()
  u_input = "".join([char for char in u_input if char not in string.punctuation])  
  response={}
  response=match(u_input)
  q_list.pop()
  return response
