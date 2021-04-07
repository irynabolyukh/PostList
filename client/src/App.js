import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Posts from "./components/Posts";
import Post from "./components/Post";
import Add from "./components/Add";
import Edit from "./components/Edit";
import NotFoundPage from "./components/NotFoundPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Redirect exact from="/posts/edit" to="/" />
                    <Route path="/posts" exact component={Posts}/>
                    <Route path="/posts/:postId" exact component={Post}/>
                    <Route path="/add" exact component={Add}/>
                    <Route path="/posts/edit/:postId" exact component={Edit}/>
                    <Redirect exact from="/" to="posts" />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    );
}


export default App;
