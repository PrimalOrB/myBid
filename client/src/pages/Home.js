import React from 'react';
import Auth from '../utils/auth';
import AuctionList from "../components/AuctionList";
import Cart from "../components/Cart";


const Home = () => {

  const loggedIn = Auth.loggedIn();

  return (
    <>
        {loggedIn ? (
          <>
            <AuctionList />
          </>
        ) : 
          <>
            Logged Out Home Component
          </>
        }
    <div className="container">
    <AuctionList />
    <Cart />
  </div>
    </>
  

  );
};

export default Home;
