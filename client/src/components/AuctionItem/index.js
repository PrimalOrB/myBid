import React, { useEffect, useState } from 'react';
import { paddedNumber, calculateTimeLeft } from '../../utils/helpers';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const AuctionItem = ( { auction, addBid } ) => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft( auction.endDate ));

    useEffect(() => {
        const timer=setTimeout(() => {
          setTimeLeft(calculateTimeLeft( auction.endDate ));
        }, 1000);
        return () => clearTimeout(timer);
    });

    const loggedIn = Auth.loggedIn();
    

  return (
    <>
        <article className='card'>
            <span className='card-title'>{ auction.title }</span>
            <span className='card-desc'>{ auction.description }</span>
            <div className='card-current'>
                <div>
                    <span>Current Bid:</span>
                    <span key={ auction.auctionInfo.currentBid.toFixed(2) } className='bid-value'>${ auction.auctionInfo.currentBid.toFixed(2) }</span>
                </div>
                <div>
                    <span>Number Of Bids:</span>
                    <span key={ auction.auctionInfo.bidCount } className='bid-count'>{ auction.auctionInfo.bidCount }</span>
                </div>
            </div>
            <div className="card-status">
                <span>Time Remaining:
                    <span className='remaining'> { ( timeLeft.days && `${timeLeft.days} days, ` ) }
                    { `${ paddedNumber( timeLeft.hours ) }:${ paddedNumber( timeLeft.minutes ) }:${ paddedNumber( timeLeft.seconds ) }` }
                    </span>        
                </span>
                { auction.auctionInfo.reserveMet ? ( 
                    <span className='reserve-met'>Reserve Met</span> 
                    ) : ( 
                    <span className='reserve-not'>Reserve Not Met</span>
                    ) 
                }
            </div>
            { ( loggedIn && addBid ) && (
            <div className="add-bid">
                <span><Link to={ `/auction/${ auction._id }`} >Add Bid!</Link></span>
            </div>
            ) }
        </article>
    </>
  );
};
export default AuctionItem;
