import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_AUCTIONS } from '../../utils/queries'
import Loading from '../Loading'
import AuctionItem from '../AuctionItem'

const AuctionList = () => {

  const { data, loading, error } = useQuery( QUERY_AUCTIONS, { pollInterval: 30000 } ); // query every 30 seconds



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
    { 
      <>
        <h1>Current Auctions</h1>
        <ul className='auction-list'>
        { data.auctions.map( ( auction ) => {
          return <AuctionItem key={ auction._id } auction={ auction } addBid={ true }/>
        } ) }
        </ul>
      </>
      }
    </>
  );
};
export default AuctionList;