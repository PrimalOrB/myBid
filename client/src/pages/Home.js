import React, {useEffect} from 'react';
import Auth from '../utils/auth';
import AuctionList from "../components/AuctionList";

const Home = () => {

  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    return () => {
      console.log("cleaned up Home");
    };
  }, []);

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
