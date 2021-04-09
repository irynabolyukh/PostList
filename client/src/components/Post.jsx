import React, {useState, useEffect} from 'react';
import {useParams,useHistory, Link} from 'react-router-dom';
import {deletePost, showDate} from "../processData";

import Return from "./Return";

const Post = () => {
    const {postId : id} = useParams();
    const history = useHistory();
    const [post, setPost] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`http://localhost:3001/posts?id=${id}`);
            const data = await result.json();
            if(!data.length){
                return;
            }
            setPost(data[0])
        };
        fetchData();
    }, [id]);

    if(!post){
        return null;
    }

    return (
        <div key={post.id}>
            <Return></Return>
            <div>
                <div className="title">{post.title}</div>
                <div className="tag">{post.tags.map(tag => (<span>#{tag} </span>))}</div>
                <div></div>
                <div className="content">{post.content}</div>
                <div className="date">{showDate(post.createdAt)}</div>
                {/* <div>Edited: {showDate(post.changedAt)}</div> */}
                <img src={post.imageUrl} alt=""/>
                <div>
                    <button>
                        <Link className="button" to={`/posts/edit/${id}`}>Edit</Link>
                    </button>
                    <button className="button" onClick={() => {
                        deletePost(id);
                        history.push('/posts');
                    }}>Delete</button>
                </div>
            </div>
        </div>
    )
};

export default Post;


