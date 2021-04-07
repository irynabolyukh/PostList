import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h1>404 - Not Found Page!</h1>
    <Link to="/">
      Go to Posts
    </Link>
  </div>
);

export default NotFoundPage;