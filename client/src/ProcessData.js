const tagSearch = (input, tag) => {
  if (!input) {
      return '';
  }
  return `${tag}=${input}`;
};

const sortSearch = (input) => {
  if (!input) {
      return '';
  }
  return `_sort=createdAt&_order=${input}`;
};

//needs to be done
const sortByTitleSearch = (input) => {
  if (!input) {
      return '';
  }
  return `_sort=title&_order=${input}`;
};

const titleSearch = (input) => {
  if (!input) {
      return '';
  }
  return `title_like=${input}`;
};

export const getPosts = async (title, tag) => {
  const tagParam = tagSearch(tag, 'tag');
  const sort = sortSearch(localStorage.getItem('sort'));
  const filter = titleSearch(title);
  const data = await fetch(`http://localhost:3001/posts?${[tagParam, sort, filter].join('&')}`);
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