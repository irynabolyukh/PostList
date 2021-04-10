import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {getAllTags, getAllImages} from "../processData";

import Return from "./Return";

const Edit = () => {
    const history = useHistory();
    const { postId: id } = useParams();
    const [post, setPost] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTag] = useState([]);
    const [imgs, setImgs] = useState([]);

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
                <select name="imageUrl" id="imageUrl" defaultValue={post.imageUrl}>
                        {imgs.map(t => (
                            <option value={t.url} key={t.id}>
                                {t.url}
                            </option>
                        ))}
                </select>
                <button type="submit" value="submit">Submit</button>
            </form>
        </div>
    )
};

export default Edit;