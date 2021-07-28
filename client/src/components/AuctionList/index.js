<<<<<<< HEAD
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_AUCTIONS } from '../../utils/queries'
import Loading from '../Loading'
import AuctionItem from '../AuctionItem'

const AuctionList = () => {

  let { data, loading, error } = useQuery( QUERY_AUCTIONS, { pollInterval: 30000 } ); // query every 30 seconds

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
=======
//we are importing globalstate which is updated and actions and passing in new updated props to front end

import React, { useEffect } from 'react';
import AuctionItem from '../AuctionItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_AUCTIONS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_AUCTIONS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
// import spinner from '../../assets/spinner.gif';

function AuctionList() {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_AUCTIONS);

  useEffect(() => {
    if (data)  {
      dispatch({
        type: UPDATE_AUCTIONS,
        auctions: data.auctions,
      });
      data.auctions.forEach((auction) => {
        idbPromise('auctions', 'put', auction);
      });
    }   else if (!loading) {
      idbPromise('auctions', 'get').then((auctions) => {
        dispatch({
          type: UPDATE_AUCTIONS,
          auctions: auctions,
        });
      });
    }
  }, [data, loading, dispatch]);

  //this function had somethings related to categories, it has been changed, may cause errors
  function filterAuctions() {
      return state.auctions;
  }

  return (
    <div className="my-2">
      <h2>Our Auctions:</h2>
      {state.auctions.length ? (
        <div className="flex-row">  
          {filterAuctions().map((auction) => (
            <AuctionItem
              key={auction._id}
              _id={auction._id}
              image={auction.image}
              name={auction.name}
              price={auction.price}
              quantity={auction.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any auctions yet!</h3>
      )}
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
    </div>
  );
}

>>>>>>> ef84b70fdc565524bba8a823ef62033fb9e96f3a
export default AuctionList;
