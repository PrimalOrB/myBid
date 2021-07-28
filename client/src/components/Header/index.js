import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
<<<<<<< HEAD
import { GiGavel } from 'react-icons/gi';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
=======
import { GiGavel } from 'react-icons/gi'
import { GrAddCircle } from 'react-icons/gr'
import { CgProfile } from  'react-icons/cg'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { FiShoppingCart } from 'react-icons/fi'
import Cart from "../Cart";
>>>>>>> 92575416fff37894af986e1669688c73e15ca051

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
<<<<<<< HEAD
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
=======
      <Link to="/">
        <h1>
          <GiGavel />
          myBid
        </h1>
      </Link>

      <nav>
        {Auth.loggedIn() ? (
          <>
            <Link to="/new"><GrAddCircle />New Auction</Link>
            <Link to="/profile"><CgProfile />Profile</Link>
            <Link to="/cart"><FiShoppingCart /></Link>
            {/* <Cart /> */}
            <Link to="/" onClick={logout}><RiLogoutCircleRLine />Logout</Link>
          </>
        ) : (
          <>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          </>
        )}
      </nav>
>>>>>>> 92575416fff37894af986e1669688c73e15ca051
    </header>
  );
};

export default Header;
