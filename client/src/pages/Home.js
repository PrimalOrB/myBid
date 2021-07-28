import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import AuctionList from "../components/AuctionList";
import Cart from "../components/Cart";


const Home = () => {

  const { data: userData } = useQuery(QUERY_ME);

  const loggedIn = Auth.loggedIn();

  return (
    <>
        {loggedIn && userData ? (
          <>
            Logged InHome Component
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
