import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {getAllTags, getAllImages} from "../processData";

import Return from "./Return";

const Add = () => {
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTag] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [imgSelected, setImg] = useState("");

    const addNew = async ({title, content}) => {
        return await fetch('http://localhost:3001/posts', {
            method: 'POST',
            body: JSON.stringify({
                createdAt: Date.now(),
                changedAt: Date.now(),
                tags: tagsSelected,
                imageUrl: imgSelected,
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((resJson) => {
            let postId = resJson.id;
            window.location.replace(`/posts/${postId}`);
        })
    };

    useEffect(() => {
        const fetchData = async () => {
            setTags(await getAllTags());
            setImgs(await getAllImages());
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        let values = Array.from(e.target.selectedOptions, option => option.value);
        setTag(values);
      };

    return (
        <div className="form">
            <Return></Return>
            <form onSubmit={async (e) => {
                e.persist();
                e.preventDefault();
                const {target: {elements: {title, content}}} = e;
                await addNew({
                    title: title.value,
                    content: content.value
                });
            }}>
                <input type="text" name="title" placeholder="Title" />
                <textarea name="content" placeholder="Content" cols="30" rows="10"/>
                <select name="tags" id="tags" onChange={handleChange} multiple>
                     {tags.map(t => (
                            <option value={t.name} key={t.name}>
                                {t.name}
                            </option>
                        ))}
                </select>
                <select name="imageUrl" id="imageUrl" onChange={e => setImg(e.target.value)}>
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

export default Add;