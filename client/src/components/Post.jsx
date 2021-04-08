import React, {useState, useEffect} from 'react';
import {useParams,useHistory, Link} from 'react-router-dom';
import {deletePost, showDate} from "../processData";

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
            <div>
                <button className="back">
                    <Link to="/" >To posts</Link>
                </button>
            </div>
            <div>
                <div>{post.title}</div>
                <div>{post.tags.map(tag => (<span>#{tag} </span>))}</div>
                <div></div>
                <div>{post.content}</div>
                <div>{showDate(post.createdAt)}</div>
                {/* <div>Edited: {showDate(post.changedAt)}</div> */}
                <img src={post.imageUrl} alt=""/>
                <Link to={`/posts/edit/${id}`}>Edit</Link>
                <button onClick={() => {
                    deletePost(id);
                    history.push('/posts');
                }}>Delete</button>
            </div>
        </div>
    )
};

export default Post;


