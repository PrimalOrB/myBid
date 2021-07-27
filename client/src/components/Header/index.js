import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { GiGavel } from 'react-icons/gi'
import { GrAddCircle } from 'react-icons/gr'
import { CgProfile } from  'react-icons/cg'
import { RiLogoutCircleRLine } from 'react-icons/ri'
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
    </header>
  );
};

export default Header;
