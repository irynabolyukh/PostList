import React, {useState, useEffect} from 'react';

const Post = ({title, content, tags, imageUrl}) => {

  return (
    <div>
      <div>{title}</div>
      <div>{content}</div>
      <div>{
        tags.map(tag => (<span>#{tag};</span>))
      }</div>
      <img src={imageUrl} alt=""/>
    </div>
  )
};


export default Post;