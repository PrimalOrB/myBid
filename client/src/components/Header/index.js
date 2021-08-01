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
            <Link to="/new"><RiAddCircleLine /><span className='menu-label'>New Auction</span></Link>
            <Link to="/profile"><CgProfile /><span className='menu-label'>Profile</span></Link>
            <Link to="/cart"><FiShoppingCart /></Link>
            <Link to="/" onClick={logout}><RiLogoutCircleRLine /><span className='menu-label'>Logout</span></Link>
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
