import React from 'react';
import Auth from '../utils/auth';
import AuctionList from "../components/AuctionList";

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
            Logged Out
          </>
        }
    </>
  

  );
};

export default Home;
