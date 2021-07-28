import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { GiGavel } from 'react-icons/gi'
import { GrAddCircle } from 'react-icons/gr'
import { CgProfile } from  'react-icons/cg'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { FiShoppingCart } from 'react-icons/fi'
import Cart from "../Cart";

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
    </header>
  );
};

export default Header;
