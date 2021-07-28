import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { GiGavel } from 'react-icons/gi';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
        <Link to="/">
          <h1><GiGavel/>myBid</h1>
        </Link>
       

        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Profile</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className= "navWord" >LOGIN</Link>
              <Link to="/signup" className= "navWord" >SIGNUP</Link>
            </>
          )}
        </nav>
    </header>
  );
};

export default Header;
