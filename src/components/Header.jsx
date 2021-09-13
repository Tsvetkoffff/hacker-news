import React from 'react';

const Header = ({ isLoading, handleClick }) => {
  return (
    <nav className='navbar fixed-top navbar-dark bg-dark'>
      <div className='container'>
        <span className='navbar-brand mb-0 h1'>Hacker news</span>
        {isLoading ? (
          <button className='btn btn-primary' type='button' disabled>
            <span
              className='spinner-border spinner-border-sm'
              role='status'
              aria-hidden='true'
            ></span>
            Loading...
          </button>
        ) : (
          <button
            type='button'
            className='btn btn-primary'
            onClick={handleClick}
          >
            Update news
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
