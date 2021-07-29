import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_AUCTIONS } from '../../utils/queries'
import Loading from '../Loading'
import OwnedItem from '../OwnedItem'
import ErrorMessage from '../ErrorMessage'

const OwnedAuctions = ( { userId }) => {

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
  const currentList = []
  const closedList = []
    // copy query results and check for expired auctions, and for current owner, then push to new array
  data.auctions.map( a => {
  const current = new Date().getTime()
    if(  current < Number( a.endDate ) && a.ownerId === userId ) {
      return currentList.push( a )
    } else if( current > Number( a.endDate ) && a.ownerId === userId ){
      return closedList.push( a )
    }
    return null
  } )
    // sort list of arrays by closest expiry
    currentList.sort((a,b) => a.endDate - b.endDate)


  return (
    <>
    { 
      <>
        <ul className='owned-list'>
        <h2>Active Owned Auctions</h2>
        { currentList.length > 0 ? ( currentList.map( ( auction ) => {
            return <OwnedItem key={ auction._id} auction={ auction }/>
          } 
        ) ) : (
          <span>No Active Owned Auction</span>  
        ) }
        </ul>
        <ul className='owned-list'>
        <h2>Completed Owned Auctions</h2>
        { closedList.length > 0 ? ( closedList.map( ( auction ) => {
            return <OwnedItem key={ auction._id} auction={ auction } type={ 'closed' }/>
          } 
        ) ) : (
          <span>No Closed Owned Auction</span>  
        ) }
        </ul>
      </>
      }
    </>
  );



};
export default OwnedAuctions;
