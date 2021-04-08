import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {getAllTags} from "../ProcessData";


const Add = () => {
    const history = useHistory();
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTag] = useState([]);

    const addNew = async ({title, content, imageUrl}) => {
        return await fetch('http://localhost:3001/posts', {
            method: 'POST',
            body: JSON.stringify({
                createdAt: Date.now(),
                changedAt: Date.now(),
                tags: tagsSelected,
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
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        let values = Array.from(e.target.selectedOptions, option => option.value);
        setTag(values);
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
                const {target: {elements: {title, content, imageUrl}}} = e;
                await addNew({
                    title: title.value,
                    content: content.value,
                    imageUrl: imageUrl.value
                });
                history.push('/posts');
            }}>
                <input type="text" name="title" placeholder="Title" className=""/>
                <textarea name="content" placeholder="Content" className=""/>
                <input type="text" name="imageUrl" placeholder="Image URL" className=""/>
                <select name="tags" id="tags" className="" onChange={handleChange} multiple>
                     {tags.map(t => (
                            <option value={t.name} key={t.name}>
                                {t.name}
                            </option>
                        ))}
                </select>
                <input type="submit" value="submit" className=""/>
            </form>
        </div>
    )
};

export default Add;