import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_AUCTION } from '../../utils/queries'
import Loading from '../Loading'
import AuctionItem from '../AuctionItem'
import { useParams } from 'react-router-dom';
import BidForm from '../BidForm'

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
      <h1>Error</h1>
    )
  }

  return (
    <>
        <div className="place-bid-container">
            <AuctionItem key={ data.auction._id } auction={ data.auction } addBid={ false }/>
            <BidForm auctionId={ _id } />
        </div>
    </>
  );
};
export default AuctionDetail;