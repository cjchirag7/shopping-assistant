import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Chat from './components/chatbot/Chat';
import SunglassesPreview from './components/SunglassesPreview';
import ClothesPreview from './components/ClothesPreview';

function App() {
  return (
    <Router>
     <Switch>
     <Route path="/try/cloth">
       <ClothesPreview/>
     </Route>              
     <Route path="/try/sunglasses">
       <SunglassesPreview/>
     </Route>       
     <Route path="/">
       <Chat/>
     </Route>
     </Switch>
    </Router>   
  );
}

export default App;
