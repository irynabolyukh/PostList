const tagSearch = (input, tag) => {
  if (!input) {
      return '';
  }
  return `${tag}=${input}`;
};

const sortSearch = (sortDate,sortTitle) => {
  if (!sortDate || !sortTitle) {
      return '';
  }
  return `_sort=createdAt,title&_order=${sortDate},${sortTitle}`;
};

const titleSearch = (input) => {
  if (!input) {
      return '';
  }
  return `title_like=${input}`;
};

export const getPosts = async (title, tag) => {
  const tagParam = tagSearch(tag, 'tag');
  const sort = sortSearch(localStorage.getItem('sort'),localStorage.getItem('sortTitle'));
  const filter = titleSearch(title);
  const data = await fetch(`http://localhost:3001/posts?${[tagParam, filter, sort].join('&')}`);
  return await data.json();
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
  return d.getDate().toString() + " " + months[d.getMonth()] + " " + d.getFullYear().toString() + ", " + d.getHours() + ":" + d.getMinutes();
};

export const showPreview = text => {
  return text.slice(0,40) + "...";
};