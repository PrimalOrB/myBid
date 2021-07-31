import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import auth from "../utils/auth";


//list of items -state.cart and map objects, auctionList
//checkout button, stripe event loop

//following is a sample to map items onthsis page to have a total price 
//push to stripe only 
//data passsed in global state is here as a reference
/*
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAuctionReducer({
    auctions: [],
    cart: [{title: "dummy1", price: 123.00 }, {title: "dummy2", price: 167.00}, {title: "dummy3", price: 450.00}]
  });
*/
<ul className='auction-list'>
        { sortedList.length > 0 ? ( sortedList.map( ( auction ) => {
            return <AuctionItem key={ auction._id } auction={ auction } addBid={ true }/>
          } 
        ) ) : (
          <Loading />
        ) }
        </ul>

export default Cart;