import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_AUCTION } from '../../utils/queries'
import Loading from '../Loading'
import AuctionItem from '../AuctionItem'
import { useParams } from 'react-router-dom';
import BidForm from '../BidForm'
import ErrorMessage from '../ErrorMessage'
import Auth from '../../utils/auth';

const AuctionDetail = ( ) => {

const { id: _id } = useParams();

const { loading, data, error  } = useQuery(QUERY_AUCTION,{
    variables: { id: _id },
    pollInterval: 10000 // query every 10 seconds
  });

  if( loading ){
    return (
      <Loading />
    )
  }

  if( error ){
    return (
      <ErrorMessage />
    )
  }

    // check to see if logged in user is the auction owner
  const checkUserIsOwner = Auth.getProfile().data._id === data.auction.ownerId
    // check to see if auction is expired
  const checkExpired = new Date( Number( data.auction.endDate ) ).getTime() < new Date().getTime()

  return (
    <>
      <h1>Add Bid</h1>
        <div className="place-bid-container">
          <AuctionItem key={ data.auction._id } auction={ data.auction } addBid={ false }/>
          { checkUserIsOwner && <div className='error'>You cannot bid on your own Auction!</div> }
          { checkExpired && <div className='error'>You cannot bid on a closed Auction!</div> }
          { ( !checkUserIsOwner && !checkExpired ) && <BidForm auctionId={ _id } currentBid={ data.auction.auctionInfo.currentBid } /> }
        </div>
    </>
  );
};
export default AuctionDetail;