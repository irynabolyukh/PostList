import React, {useEffect, useState} from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {getAllTags, getAllImages} from "../processData";

const Edit = () => {
    const history = useHistory();
    const { postId: id } = useParams();
    const [post, setPost] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTag] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [imgSelected, setImg] = useState("");

    const putData = ({title, content, createdAt}) => {
        fetch(`http://localhost:3001/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              changedAt: Date.now(),
              createdAt,
              tags: tagsSelected,
              imageUrl: imgSelected,
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
        <div>
            <div> 
                <button className="">
                    <Link to="/" >Cancel</Link>
                </button>
            </div>
            <form onSubmit={(e) => {
                e.persist();
                e.preventDefault();
                const {target: {elements: {title, content}}} = e;
                putData({
                  title: title.value,
                  content: content.value,
                  createdAt: post.createdAt,
                  tags: tags
                });
                history.push(`/posts/${post.id.toString()}`);
            }}>
                <input type="text" name="title" defaultValue={post.title} className=""/>
                <textarea name="content" defaultValue={post.content} className=""/>
                <select name="tags" id="tags" defaultValue={post.tags} className="" onChange={handleChange} multiple>
                     {tags.map(t => (
                            <option value={t.name} key={t.name}>
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
                <input type="submit" value="submit" className=""/>
            </form>
        </div>
    )
};

export default Edit;