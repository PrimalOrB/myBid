<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { GiGavel } from 'react-icons/gi'
import { GrAddCircle } from 'react-icons/gr'
import { CgProfile } from  'react-icons/cg'
import { RiLogoutCircleRLine } from 'react-icons/ri'
=======
import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { GiGavel } from "react-icons/gi";

>>>>>>> feature/login-signup
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <Link to="/">
        <h1>
          <GiGavel />
          myBid
        </h1>
      </Link>

<<<<<<< HEAD
        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link to="/new"><GrAddCircle />New Auction</Link>
              <Link to="/profile"><CgProfile />Profile</Link>
              <Link to="/" onClick={logout}><RiLogoutCircleRLine />Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
=======
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
>>>>>>> feature/login-signup
    </header>
  );
};

export default Header;
