import React from 'react';
import OwnedItem from '../OwnedItem'

const OwnedAuctions = ( { title, auctions }) => {

  return (
    <>
    { 
      <>
          <ul className='owned-list'>
          <h2>{title}</h2>
          { auctions.map( auction => {
            return <OwnedItem key={ auction._id} auction={ auction }/>
          }) }
          </ul>
      </>
      }
    </>
  );



};
export default OwnedAuctions;
