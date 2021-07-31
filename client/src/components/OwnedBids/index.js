import React from 'react';
import OwnedBidsCard from '../OwnedBidCard'

const OwnedBids = ( { bids, user, type }) => {

  bids = bids.sort( ( a, b ) => a.auction.endDate - b.auction.endDate )

  return (
    <>
    { 
      <>
        <ul className='owned-list'>
        <h2>Active Bids</h2>
        { bids.map( bid => {
          return <OwnedBidsCard key={ bid.bid._id } bid={ bid.bid } auction={ bid.auction } user={ user} type={ type } />
          })    
        }
        </ul>
      </>
      }
    </>
  );



};
export default OwnedBids;
