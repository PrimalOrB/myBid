import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import OwnedAuctions from '../components/OwnedAuctions'
import OwnedBids from '../components/OwnedBids'
import { Link } from 'react-router-dom';

const Profile = () => {

  useEffect(() => {
    return () => {
      console.log("cleaned up Profile");
    };
  }, []);

  const { loading, data } = useQuery(QUERY_ME, { pollInterval: 30000 });

  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  } 

  const currentList = []
  const closedList = []
  user.auctions.map( a => {
    const current = new Date().getTime()
      if(  current < Number( a.endDate ) ) {
        return currentList.push( a )
      } else if( current > Number( a.endDate ) ){
        return closedList.push( a )
      }
      return null
    } )
  // sort list of arrays by closest expiry
  currentList.sort((a,b) => a.endDate - b.endDate)

  // filter for most current bids by user for each auction
  const currentBids = {}
  user.bids.map( ( bid, i ) => {
    if( !currentBids[bid.auctionId] ){
      currentBids[bid.auctionId] = {}
      currentBids[bid.auctionId].bid = bid
      currentBids[bid.auctionId].auction = user.bidsStore[i]
    } else {
      if( bid.createdAt > currentBids[bid.auctionId].bid.createdAt ){
        console.log( 'updated' )
        currentBids[bid.auctionId].bid = bid
      } else {
        console.log( 'not updated' )
      }
    }
  })

  const activeBids = []
  Object.values( currentBids ).map( ( auction, i ) => {
      if( auction.auction.activeStatus === true ){
        return activeBids.push( auction )
      }
      return
  } )

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <span>{ `Username: ${ user.username }` }</span>
          <Link to={ '/changepw' } className='change-pw'>Change Password</Link> 
        </div>
        <div className="profile-items">
          <OwnedBids bids={ activeBids } user={ user._id} />
          <OwnedAuctions auctions={ currentList } title='Active Owned Auctions'/>
          <OwnedAuctions auctions={ closedList } title='Completed Owned Auctions' type='closed'/>
        </div>
      </div>
    </>
  );
};

export default Profile;
