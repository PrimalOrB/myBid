import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import AuctionList from '../components/AuctionList';


const Home = () => {

  const { data: userData } = useQuery(QUERY_ME);

  const loggedIn = Auth.loggedIn();

  return (
    <>
        {loggedIn && userData ? (
          <>
            <AuctionList />
          </>
        ) : 
          <>
            Logged Out Home Component
          </>
        }
    </>
  );
};

export default Home;
