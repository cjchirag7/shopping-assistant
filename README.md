# Shopping Assistant
Shopping Assistant is a chatbot, which can assist consumers in deciding the right product and bridge the gap between online and offline shopping. 

## Features
- It will give some suggestions to the consumer depending upon his needs, just like a salesperson.
- It will also provide a summary of all the reviews about that product, which will help the consumer to make a wise decision.
- It also helps the consumer to virtually experience fashion products. E.g. If a consumer needs to try a cloth or a spectacle our shopping assistant gives    him real time experience of how that product would look on him/her.

## How to run locally?

### Running the API

0. If you don't already have `pipenv` installed, install it using the following commands:
```
pip install --upgrade setuptools wheel
pip install --user pipenv
```

1. Activate the virtual environment in the `api` folder by using the following command:

```
cd services/api
pipenv shell
```

2. In the activated virtual environment, run the following command to install all the dependencies:

```
pipenv install -r requirements.txt
```

3. In the activated virtual environment, run the following command to run the API:

```
uvicorn main:app --reload
```

4. The `server` would run at http://127.0.0.1:8000/ and the `API documentation` would be available at http://127.0.0.1:8000/docs

### Running the Web App

1. Make sure you have `node` installed with version >= 14. Check using following command:

```
node -v
```

2. In the `web-app` folder, install all the dependencies using the following command:

```
cd services/web-app
npm install
```

3. In the web-app folder, run the React App using:

```
npm start
```

4. The web app would start running at http://localhost:3000

## Tech Stack

### API

- [FastAPI](https://fastapi.tiangolo.com/#example)
### Web App

- [React.js](https://reactjs.org/docs/getting-started.html)