import React = require("react");
import { useStoreContext } from '../../utils/GlobalState';
import auth from "../utils/auth";

//checkout needs to change and replacecart while importing 

//list of items -state.cart and map objects, auctionList
//checkout button, stripe event loop
//import: need component cart and cart-item in checkout component 

//following is a sample to map items onthsis page to have a total price 
//push to stripe only 
<ul className='auction-list'>
        { sortedList.length > 0 ? ( sortedList.map( ( auction ) => {
            return <AuctionItem key={ auction._id } auction={ auction } addBid={ true }/>
          } 
        ) ) : (
          <Loading />
        ) }
        </ul>