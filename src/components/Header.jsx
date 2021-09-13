import React from 'react';

const Header = ({ isLoading }) => {
  return (
    <nav className='navbar fixed-top navbar-dark bg-dark'>
      <div className='container-fluid pe-5 ps-5'>
        <span className='navbar-brand mb-0 h1'>Hacker news</span>
        {isLoading ? (
          <button class='btn btn-primary' type='button' disabled>
            <span
              class='spinner-border spinner-border-sm'
              role='status'
              aria-hidden='true'
            ></span>
            Loading...
          </button>
        ) : (
          <button type='button' className='btn btn-primary'>
            Update news
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
