import React, { useEffect, useState } from 'react';
import './App.css';
// import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Post from "./components/Post"

function App() {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Test title")

  useEffect(() => {
    getPosts();
  }, [query]);
  
  const getPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts?title=${query}`);
    const data = await response.json();
    setPosts(data);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
     <h1>Hello React</h1>
     <form onSubmit={getSearch} className="search-form">
       <input className="search-bar" value={search} onChange={updateSearch}></input>
       <button className="search-button" type="submit">Seacrh</button>
     </form>
     {posts.map(post => (
       <Post key={post.id} title={post.title} content={post.content} tags={post.tags} imageUrl={post.imageUrl}/>
     ))}
    </div>
  );
}

export default App;
