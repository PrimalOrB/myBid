import React from 'react';
import OwnedBidsCard from '../OwnedBidCard'

const OwnedBids = ( { bids, user }) => {

  return (
    <>
    { 
      <>
        <ul className='owned-list'>
        <h2>Active Bids</h2>
        { bids.map( bid => {
          return <OwnedBidsCard key={ bid.bid._id } bid={ bid.bid } auction={ bid.auction } user= { user} />
          })    
        }
        </ul>
      </>
      }
    </>
  );



};
export default OwnedBids;
