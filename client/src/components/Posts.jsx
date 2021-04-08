import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {SORT} from '../AppConstants';
import {deletePost, getPosts, showDate, showPreview, getUsedTags} from "../ProcessData";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState([]);

    const fetchData = async () => {
        setPosts(await getPosts(title, tag));
    };
    const deleteThisPost = id => async () => {
        await deletePost(id);
        fetchData();
    };

    const handleChange = (e) => {
        let values = Array.from(e.target.selectedOptions, option => option.value);
        setTag(values);
      }

    useEffect(() => {
        const fetchData = async () => {
            setTags(await getUsedTags());
            setPosts(await getPosts(title, tag));
        };
        fetchData();
    }, [tag, title]);

    return (
        <div>
            <div className="">
                <div>
                    <label htmlFor="tag" className="">Tag</label>
                    <select name="tag" id="tag" onChange={handleChange} multiple>
                        {tags.map(t => (
                            <option value={t} key={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="sort" className="">Sort by Date</label>
                    <select name="sort" id="sort" onChange={e => {
                        localStorage.setItem('sort', e.target.value);
                        fetchData();
                    }}
                            defaultValue={localStorage.getItem('sort')}>
                        {SORT.map(t => (
                            <option value={t.value} key={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="sortTitle" className="">Sort by Title</label>
                    <select name="sortTitle" id="sortTitle" onChange={e => {
                        localStorage.setItem('sortTitle', e.target.value);
                        fetchData();
                    }}
                            defaultValue={localStorage.getItem('sortTitle')}>
                        {SORT.map(t => (
                            <option value={t.value} key={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="name" className="">TITLE</label>
                    <input type="text" name="name" onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="">
                    <button className="">
                        <Link to="add">Add</Link>
                    </button>
                </div>
            </div>
            <div className="">
                {(posts || []).map(post => (
                    <div key={post.id} className="">
                        <div><Link to={`posts/${post.id.toString()}`}>{post.title}</Link></div>
                        <div>{post.tags.map(tag => (<span>#{tag} </span>))}</div>
                        <div></div>
                        <div>{showPreview(post.content)}</div>
                        <div>{showDate(post.createdAt)}</div>
                        {/* <div>Edited: {showDate(post.changedAt)}</div> */}
                        <img src={post.imageUrl} alt=""/>
                        <div className="">
                            <div className="">
                                <button>
                                    <Link to={`posts/edit/${post.id.toString()}`}>Edit</Link>
                                </button>
                            </div>
                            <div className="">
                                <button onClick={deleteThisPost(post.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Posts;