import React from 'react';

export default ({ by, time, score, title, url }) => (
  <a
    href={url}
    className='list-group-item list-group-item-action'
    aria-current='true'
  >
    <div className='d-flex w-100 justify-content-between'>
      <h5 className='mb-1'> { title } </h5>
      <small>{time}</small>
    </div>
    <p className='mb-1'>{by}</p>
    <small>{score}</small>
  </a>
);
