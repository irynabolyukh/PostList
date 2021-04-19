const sortSearch = (sortDate,sortTitle) => {
  if (!sortDate && !sortTitle) {
      return '';
  }
  if (!sortDate && !!sortTitle) {
    return `_sort=title&_order=${sortTitle}`;
  }
  if (!!sortDate && !sortTitle) {
    return `_sort=createdAt&_order=${sortDate}`;
  }
  return `_sort=createdAt,title&_order=${sortDate},${sortTitle}`;
};

const titleSearch = (input) => {
  if (!input) {
      return '';
  }
  return `title_like=${input}`;
};

const checkAllTags = (postTagsArray, searchTagsArray) => {
  return searchTagsArray.every(tag => postTagsArray.includes(tag));
}

export const getPosts = async (title, tag) => {
  const sort = sortSearch(localStorage.getItem('sort'),localStorage.getItem('sortTitle'));
  const filter = titleSearch(title);
  const data = await fetch(`http://localhost:3001/posts?${[filter, sort].join('&')}`);
  const jsonArray = await data.json();
  return jsonArray.filter(post => checkAllTags(post.tags,tag));
};

export const getAllTags = async () => {
  const data = await fetch(`http://localhost:3001/tags`);
  return await data.json();
};

export const getAllImages = async () => {
  const data = await fetch(`http://localhost:3001/images`);
  return await data.json();
};

export const getUsedTags = async () => {
  const data = await fetch(`http://localhost:3001/posts`);
  const jsonArray = await data.json();
  
  let jointArray = []
  jsonArray.forEach(post => jointArray=jointArray.concat(post.tags));

  const uniqueArray = jointArray.reduce((newArray, item) =>{
      if (newArray.includes(item)){
          return newArray;
      } else {
          return [...newArray, item];
      }
  }, []);
  return uniqueArray;
};

export const getJustPosts = async () => {
  const data = await fetch(`http://localhost:3001/posts`);
  return await data.json();
};

export const deletePost = async id => {
  return await fetch(`http://localhost:3001/posts/${id}`, { method: 'DELETE'});
};

export const showDate = mils => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let d = new Date(mils);
  return d.getDate().toString() + " " + months[d.getMonth()] + " " + d.getFullYear().toString() + ", " + d.getHours() + ":" + ((d.getMinutes() < 10)?("0"+d.getMinutes()):(d.getMinutes()));
};

export const showPreview = text => {
  return text.slice(0,40) + "...";
};
