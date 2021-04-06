import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {TAGS, SORT} from '../AppConstants';
import {deletePost, getPosts, getJustPosts, showDate} from "../ProcessData";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');

    const fetchData = async () => {
        setPosts(await getPosts(title, tag));
        // setPosts(await getJustPosts());
    };
    const deleteThisPost = id => async () => {
        await deletePost(id);
        fetchData();
    };

    useEffect(() => {
        const fetchData = async () => {
            setPosts(await getPosts(title, tag));
            // setPosts(await getJustPosts());
        };
        fetchData();
    // }, []);
    }, [tag, title]);

    return (
        <div>
            <div className="">
                <div>
                    <label htmlFor="tag" className="">Tag</label>
                    <select name="tag" id="tag" onChange={e => setTag(e.target.value)}>
                        {TAGS.map(t => (
                            <option value={t} key={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="sort" className="">Sort</label>
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
                        <div>{post.title}</div>
                        <div>{post.tags.map(tag => (<span>#{tag} </span>))}</div>
                        <div></div>
                        <div>{post.content}</div>
                        <div>Created: {showDate(post.createdAt)}</div>
                        <div>Edited: {showDate(post.changedAt)}</div>
                        <img src={post.imageUrl} alt=""/>
                        <div className="">
                            <div className="">
                                <button>
                                    <Link to={`posts/${post.id.toString()}`}>View</Link>
                                </button>
                            </div>
                            <div className="">
                                <button>
                                    <Link to={`posts/${post.id.toString()}/edit`}>Edit</Link>
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