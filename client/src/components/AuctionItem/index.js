import React, { useEffect, useState } from 'react';
import { paddedNumber } from '../../utils/helpers';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const AuctionItem = ( { auction, addBid } ) => {

    const calculateTimeLeft = () => {
        let difference = +new Date( Number( auction.endDate ) ) - +new Date();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer=setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const loggedIn = Auth.loggedIn();
    

  return (
    <>
        { timeLeft.seconds && 
        <article className='card'>
            <span className='card-title'>{ auction.title }</span>
            <span className='card-desc'>{ auction.description }</span>
            <div className='card-current'>
                <div>
                    <span>Current Bid:</span>
                    <span>${ auction.auctionInfo.currentBid.toFixed(2) }</span>
                </div>
                <div>
                    <span>Number Of Bids:</span>
                    <span>{ auction.auctionInfo.bidCount }</span>
                </div>
            </div>
            <div className="card-status">
            { !timeLeft.seconds ? <div className="closed-bid"><span>Auction Ended</span></div> : 
                <span>Time Remaining:
                    <span className='remaining'> { ( timeLeft.days && `${timeLeft.days} days, ` ) }
                    { `${ paddedNumber( timeLeft.hours ) }:${ paddedNumber( timeLeft.minutes ) }:${ paddedNumber( timeLeft.seconds ) }` }
                    </span>        
                </span>
            }
            { auction.auctionInfo.reserveMet ? ( 
                <span className='reserve-met'>Reserve Met</span> 
                ) : ( 
                <span className='reserve-not'>Reserve Not Met</span>
                ) 
            }
            </div>
            { ( loggedIn && addBid) && (
            <div className="add-bid">
                <span><Link to={ `/auction/${ auction._id }`} >Add Bid!</Link></span>
            </div>
            )}
        </article>
        }
    </>
  );
};
export default AuctionItem;