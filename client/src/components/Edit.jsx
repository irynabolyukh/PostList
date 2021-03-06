import React, {useEffect, useState} from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import {getAllTags, getAllImages} from "../processData";

import Return from "./Return";

const Edit = () => {
    const history = useHistory();
    const { postId: id } = useParams();
    const [post, setPost] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTag] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [imgSelected, setImg] = useState("");

    const putData = ({title, content, imageUrl, tags, createdAt}) => {
        fetch(`http://localhost:3001/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              changedAt: Date.now(),
              createdAt,
              tags,
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
            setTags(await getAllTags());
            setImgs(await getAllImages());
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

    
    const handleChange = (e) => {
        let values = Array.from(e.target.selectedOptions, option => option.value);
        setTag(values);
    };

    return (
        <div className="form">
            <Return></Return>
            <form onSubmit={(e) => {
                e.persist();
                e.preventDefault();
                const {target: {elements: {title, content, imageUrl}}} = e;
                putData({
                  title: title.value,
                  content: content.value,
                  imageUrl: imageUrl.value,
                  tags: (tagsSelected.length > 0)? tagsSelected : post.tags,
                  createdAt: post.createdAt
                });
                history.push(`/posts/${post.id.toString()}`);
            }}>
                <input type="text" name="title" defaultValue={post.title}/>
                <textarea name="content" defaultValue={post.content} cols="30" rows="10"/>
                <select name="tags" id="tags" defaultValue={post.tags} onChange={handleChange} multiple>
                     {tags.map(t => (
                            <option value={t.name} key={t.id}>
                                {t.name}
                            </option>
                        ))}
                </select>
                <select name="imageUrl" id="imageUrl" defaultValue={post.imageUrl} onChange={e => setImg(e.target.value)}>
                        {imgs.map(t => (
                            <option value={t.url} key={t.id}>
                                {t.url}
                            </option>
                        ))}
                </select>
                <div><img src={imgSelected}></img></div>
                <div className="buttons">
                    <button>
                        <Link className='text-link' to="/" >Cancel</Link>
                    </button>
                    <button type="submit" value="submit">Save</button>
                </div>
            </form>
        </div>
    )
};

export default Edit;