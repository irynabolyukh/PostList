import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Posts from "./components/Posts";
import Post from "./components/Post";
import Add from "./components/Add";
import Edit from "./components/Edit";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/posts" exact component={Posts}/>
                    <Route path="/posts/:postId" exact component={Post}/>
                    <Route path="/add" exact component={Add}/>
                    <Route path="/posts/:postId/edit" exact component={Edit}/>
                    <Redirect from="/" to="posts" />
                </Switch>
            </div>
        </Router>
    );
}


export default App;
