import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_AUCTIONS } from '../../utils/queries'
import Loading from '../Loading'
import AuctionItem from '../AuctionItem'
import ErrorMessage from '../ErrorMessage'

const AuctionList = () => {

  let { data, loading, error } = useQuery( QUERY_AUCTIONS, { pollInterval: 30000 } ); // query every 30 seconds

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

    // placeholder array of current auctions
  const sortedList = []
    // copy query results and check for expired auctions, then push to new array
  data.auctions.map( a => {
  const current = new Date().getTime()
    if(  current < Number( a.endDate ) ) {
      return sortedList.push( a )
    }
    return null
  } )
    // sort list of arrays by closest expiry
  sortedList.sort((a,b) => a.endDate - b.endDate)

  return (
    <>
    { 
      <>
        <h1>Current Auctions</h1>
        <ul className='auction-list'>
        { sortedList.length > 0 ? ( sortedList.map( ( auction ) => {
            return <AuctionItem key={ auction._id } auction={ auction } addBid={ true }/>
          } 
        ) ) : (
          <Loading />
        ) }
        </ul>
      </>
      }
    </>
  );



};
export default AuctionList;
