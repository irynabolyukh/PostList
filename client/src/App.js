import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Redirect from "react-router-dom/es/Redirect";


function App() {

  useEffect(() => {
    getPosts();
  }, []);
  
  const getPosts = async () => {
    const response = await fetch('http://localhost:3001/posts');
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="App">
     <h1>Hello React</h1>
    </div>
  );
}

export default App;
