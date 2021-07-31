import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { GiGavel } from 'react-icons/gi'
import { CgProfile } from  'react-icons/cg'
import { RiLogoutCircleRLine, RiAddCircleLine, RiLoginCircleLine, RiCreativeCommonsByLine } from 'react-icons/ri'
import { FiShoppingCart } from 'react-icons/fi'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <Link to="/" className="logo-link">
        <h1>
          <GiGavel />
          myBid
        </h1>
      </Link>

      <nav>
        {Auth.loggedIn() ? (
          <>
            <Link to="/new"><RiAddCircleLine />New Auction</Link>
            <Link to="/profile"><CgProfile />Profile</Link>
            <Link to="/cart"><FiShoppingCart /></Link>
            <Link to="/" onClick={logout}><RiLogoutCircleRLine />Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login"><RiLoginCircleLine />Login</Link>
            <Link to="/signup"><RiCreativeCommonsByLine />Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
