import React, {useEffect, useState} from 'react';
import {TAGS} from "../AppConstants";
import { Link, useParams, useHistory } from 'react-router-dom';

const Edit = () => {
    const history = useHistory();
    const { postId: id } = useParams();
    const [post, setPost] = useState(null);

    const putData = ({title, content, imageUrl, tags, createdAt}) => {
        fetch(`http://localhost:3001/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              changedAt: Date.now(),
              createdAt,
              tags: [tags],
              imageUrl,
              title,
              content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    };
    
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
        <div>
            <div> 
                <button className="">
                    <Link to="/" >Cancel</Link>
                </button>
            </div>
            <form onSubmit={(e) => {
                e.persist();
                e.preventDefault();
                const {target: {elements: {title, content, imageUrl, tags}}} = e;
                putData({
                  title: title.value,
                  content: content.value,
                  imageUrl: imageUrl.value,
                  tags: tags.value,
                  createdAt: post.createdAt
                });
                history.push(`/posts/${post.id.toString()}`);
            }}>
                <input type="text" name="title" defaultValue={post.title} className=""/>
                <input type="text" name="imageUrl" defaultValue={post.imageUrl} className=""/>
                <textarea name="content" defaultValue={post.content} className=""/>
                <select name="tags" id="tags" defaultValue={post.tags} className="">
                    {TAGS.map(t => (
                        <option value={t} key={t}>
                            {t}
                        </option>
                    ))}
                </select>
                <input type="submit" value="submit" className=""/>
            </form>
        </div>
    )
};

export default Edit;