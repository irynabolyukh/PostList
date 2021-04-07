import React from 'react';
import {TAGS} from "../AppConstants";
import { Link, useHistory } from 'react-router-dom';

const Add = () => {
    const history = useHistory();
    const addNew = async ({title, content, imageUrl, tags}) => {
        return await fetch('http://localhost:3001/posts', {
            method: 'POST',
            body: JSON.stringify({
                createdAt: Date.now(),
                changedAt: Date.now(),
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
    return (
        <div>
            <div> 
                <button className="">
                    <Link to="/" >Cancel</Link>
                </button>
            </div>
            <form onSubmit={async (e) => {
                e.persist();
                e.preventDefault();
                const {target: {elements: {title, content, imageUrl, tags}}} = e;
                await addNew({
                    title: title.value,
                    content: content.value,
                    imageUrl: imageUrl.value,
                    tags: tags.value
                });
                history.push('/posts');
            }}>
                <input type="text" name="title" placeholder="Title" className=""/>
                <textarea name="content" placeholder="Content" className=""/>
                <input type="text" name="imageUrl" placeholder="Image URL" className=""/>
                <select name="tags" id="tags" className="">
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

export default Add;