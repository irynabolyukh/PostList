import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="not-found">
    <h1>404 - Not Found Page!</h1>
    <button>
      <Link className='text-link' to="/">
        To Posts
      </Link>
    </button>
  </div>
);

export default NotFoundPage;