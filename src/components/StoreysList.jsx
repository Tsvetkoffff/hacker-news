import React from 'react';
import { Link } from 'react-router-dom';
import { mapDateFromStamp } from '../mappers/mapDateFromStamp';

export const StoreysList = ({ by, score, title, time, id }) => (
  <Link
    to={`/${id}`}
    className='list-group-item list-group-item-action'
    aria-current='true'
  >
    <div className='d-flex w-100 justify-content-between'>
      <h5 className='mb-1 pe-3'> {title} </h5>
      <small>{mapDateFromStamp(time)}</small>
    </div>
    <p className='mb-1'>Story by: {by}</p>
    <small>Rating: {score}</small>
  </Link>
);

export default StoreysList;
