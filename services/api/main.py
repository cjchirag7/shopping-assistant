from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from tryOn import virtual_tryon
from evaluate import execute
from pose_parser import pose_parse
from chatbot.chatbot import get_response
from fastapi.staticfiles import StaticFiles
import time
import numpy as np
from io import BytesIO
from PIL import Image

serverURL = "http://localhost:8000"
app = FastAPI()

app.mount("/output", StaticFiles(directory="output"), name="output")
app.mount("/Database", StaticFiles(directory="Database"), name="Database")

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_image_into_numpy_array(data):
    return np.array(Image.open(BytesIO(data)).convert("RGB"))

## Routes

@app.get("/")
def read_root():
    return {"msg": "View the documentation of API at http://127.0.0.1:8000/docs"}

@app.post("/upload_image/{user_id}")
async def upload_image(user_id: str, image: Optional[UploadFile] = File(None)):
    if image is None:
        return {"error": "File not uploaded."}    
    image_path='/Database/val/person/'+user_id+'.jpg'
    image = load_image_into_numpy_array(await image.read())  
    person = Image.fromarray(image)      
    req_size = (192,256)
    if person.size!=req_size:
        person = person.resize(req_size)
    person.save('.'+image_path)    
    pose_parse(user_id)
    execute()
    image_url=serverURL+image_path
    return {"image_url": image_url}

@app.get("/virtual_try/{item_id}")
def get_virtual_try_image(item_id: str, user_id: str):
    result_url=serverURL+virtual_tryon(user_id,item_id)
    return {"result_url": result_url}

@app.get("/ask")
def get_chatbot_response(question: str):
    response = get_response(question)
    return {"response": response}