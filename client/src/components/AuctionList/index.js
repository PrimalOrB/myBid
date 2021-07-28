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

export default AuctionList;
