import React from 'react';
import {Link} from 'react-router-dom';

const Return = () => {
  return (
        <div key="return">
            <button className="return">
                <Link to="/" >To posts</Link>
            </button>
        </div>
  )
}

export default Return;