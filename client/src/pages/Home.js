import React, {useEffect} from 'react';
import AuctionList from "../components/AuctionList";

const Home = () => {

  useEffect(() => {
    return () => {
      console.log("cleaned up Home");
    };
  }, []);

  return (
    <>
    <h1>Current Auctions</h1>
    <AuctionList />
    </>
  );
};

export default Home;
