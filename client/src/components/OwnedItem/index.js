import React, { useEffect, useState } from 'react';
import { paddedNumber, calculateTimeLeft } from '../../utils/helpers';
import Auth from '../../utils/auth';
import Loading from '../Loading';
import { FaEdit } from 'react-icons/fa'



const OwnedItem = ( { auction, type } ) => {

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
        { loggedIn ? (
            <article className='card'>
                <span className='card-title'>{ timeLeft.seconds && <a href={ `/edit/${ auction._id }`}><FaEdit /></a> } { auction.title } </span>
                <span className='card-desc'>{ auction.description }</span>
                <div className='card-current'>
                    <div>
                        { type === 'closed' ? 
                            <span>Winning Bid:</span>
                        :
                            <span>Current Bid:</span>
                        }
                        <span key={ auction.auctionInfoStore.currentBid.toFixed(2) } className='bid-value'>${ auction.auctionInfoStore.currentBid.toFixed(2) }</span>
                    </div>
                    <div>
                        <span>Number Of Bids:</span>
                        <span key={ auction.auctionInfoStore.bidCount } className='bid-count'>{ auction.auctionInfoStore.bidCount }</span>
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
                { auction.auctionInfoStore.reserveMet ? ( 
                    <span className='reserve-met'>Reserve Met</span> 
                    ) : ( 
                    <span className='reserve-not'>Reserve Not Met</span>
                    ) 
                }
                </div>
            </article>
        ) : (
            <Loading />
        )}
        </>
    );
};
export default OwnedItem;
