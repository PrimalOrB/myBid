const { Schema, model } = require( 'mongoose' );
const bidSchema = require( './Bid' )

const auctionSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    reserve: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    bids: [ 
      {
        type: Schema.Types.ObjectId,
        ref: 'Bid'
      }
     ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

  // virtual prop to determine whether the auction is active (ie, if the endDate has passed)
auctionSchema.virtual('activeStatus').get(function() {
  return this.endDate > new Date();
});

  // virtual prop to determine whether the auction is active (ie, if the endDate has passed)
auctionSchema.virtual('auctionInfo').get(function() {
  bidders = this.bids
  // initial auction object
  auction = {
    bidCount: 0,
    reserve: this.reserve,
    reserveMet: false,
    currentBid: 0,
    currentLeader: "",
  }

  if( bidders.length ===1 ){
    auction.currentBid = auction.currentBid + bidders[0].increment 
    auction.bidCount += 1
    auction.reserveMet = auction.currentBid >= auction.reserve
    auction.currentLeader = bidders[0].userId
  }

  let bidOrder = bidders.sort( ( a, b ) => a.createdAt - b.createdAt )

  for( let i = 0; i < bidOrder.length; i++){
    //for first bidder, do their initial bid
    if( i === 0 ){
        if( !bidOrder[i].incrementing ) { // if one time bid
            auction.bidCount +=1 // add to bidcount
            auction.currentBid = bidOrder[i].maxBid  //set current bid
            auction.reserveMet = auction.currentBid >= auction.reserve // check reserve
            auction.currentLeader = bidOrder[i].userId // set leading userId
        } else if ( bidOrder[i].incrementing ) { // if incrementing bid
            auction.bidCount +=1 // add to bidcount
            auction.currentBid = auction.currentBid + bidOrder[i].increment  //set current bid
            auction.reserveMet = auction.currentBid >= auction.reserve // check reserve
            auction.currentLeader = bidOrder[i].userId // set leading userId
        }
    }
    // for next bidder in timeline, increment their bids
    let activeBidders = bidOrder.filter( x => x.createdAt <= bidOrder[i].createdAt ) // filter users who bid before current users in timeline
    while( activeBidders.length > 1 ){ 
        activeBidders.map( ( bid, index ) => {
            if( !bid.incrementing && bid.maxBid > auction.currentBid  ) { // if one time bid and bid greater than current bid
                auction.bidCount +=1 // add to bidcount
                auction.currentBid = bid.maxBid //set current bid
                auction.reserveMet = auction.currentBid >= auction.reserve // check reserve
                auction.currentLeader = bid.userId // set leading userId
            } else if ( ( auction.currentBid + bid.increment ) <= bid.maxBid && bid.incrementing === true) { // if incrementing bid
                auction.bidCount +=1 // add to bidcount
                auction.currentBid = auction.currentBid + bid.increment  //set current bid
                auction.reserveMet = auction.currentBid >= auction.reserve // check reserve
                auction.currentLeader = bid.userId // set leading userId
            } else {
                activeBidders.splice( index, 1) // if user cannot continue, remove from activeBidders
            }
        })
      }
    }
  return auction;
});

const Auction = model( 'Auction', auctionSchema );

module.exports = Auction;
