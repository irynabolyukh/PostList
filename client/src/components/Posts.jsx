import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {SORT} from '../appConstants';
import {deletePost, getPosts, showDate, showPreview, getUsedTags} from "../processData";

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

    const clearFilters = async () => {
        setTag([]);
        setTitle('');
        localStorage.setItem('sort', '');
        localStorage.setItem('sortTitle', '');
        fetchData();
    };

    const handleChange = (e) => {
        let values = Array.from(e.target.selectedOptions, option => option.value);
        setTag(values);
    };

    useEffect(() => {
        const fetchData = async () => {
            setTags(await getUsedTags());
            setPosts(await getPosts(title, tag));
        };
        fetchData();
    }, [tag, title]);

    return (
        <div>
            <div className="search-menu">
                <div>
                    <label htmlFor="tag">Tag</label>
                    <select name="tag" id="tag" onChange={handleChange} multiple>
                        {tags.map(t => (
                            <option value={t} key={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="sort">Sort by Date</label>
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
                    <label htmlFor="sortTitle">Sort by Title</label>
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
                    <label htmlFor="name">Search by Title</label>
                    <input type="text" name="name" onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <button>
                        <Link className='text-link' to="add"><span>Add</span></Link>
                    </button>
                </div>
            </div>
            <div className="buttons">
                <button onClick={clearFilters}>Clear</button>
            </div>
            <div>
                {(posts || []).map(post => (
                    <div key={post.id} className="post">
                        <hr/>
                        <div className="title"><Link className='title-link' to={`posts/${post.id.toString()}`}>{post.title}</Link></div>
                        <div className="tag">{post.tags.map(tag => (<span>#{tag} </span>))}</div>
                        <div></div>
                        <div className="content">{showPreview(post.content)}</div>
                        <div className="date">{showDate(post.createdAt)}</div>
                        <img src={post.imageUrl} alt=""/>
                        <div className="buttons">
                            <button>
                                    <Link className='text-link' to={`posts/edit/${post.id.toString()}`}><span>Edit</span></Link>
                            </button>
                            <button onClick={deleteThisPost(post.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Posts;