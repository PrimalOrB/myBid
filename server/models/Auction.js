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
    console.log( `${bidders[0].userId} bids $${auction.currentBid} ( initial bid of $${ bidders[0].increment } ) `)
  }

  let bidOrder = bidders.sort( ( a, b ) => a.createdAt - b.createdAt )
  console.log( bidOrder )

    while( bidOrder.length > 1 ){
        for( var i = 0; i < bidOrder.length; i++){
            if( auction.currentBid + bidOrder[i].increment <= bidOrder[i].maxBid && bidOrder[i].incrementing === true ){ // if bidder can bid within their increment, then add to current bid, and number of bids
                auction.currentBid = auction.currentBid + bidOrder[i].increment 
                auction.bidCount += 1
                auction.reserveMet = auction.currentBid >= auction.reserve
                auction.currentLeader = bidOrder[i].userId
                console.log( `${bidOrder[i].userId} bids $${auction.currentBid} ( increment by $${ bidOrder[i].increment } ) `)
            } else if ( bidOrder[i].incrementing === false && bidOrder[i].maxBid > auction.currentBid ) { // if bidder places one-time bid (non incrementing) greater than current, then increase current to their max bid
                auction.currentBid = bidOrder[i].maxBid 
                auction.bidCount += 1
                auction.reserveMet = auction.currentBid >= auction.reserve
                auction.currentLeader = bidOrder[i].userId
                console.log( `${bidOrder[i].userId} bids $${bidOrder[i].maxBid} ( flat rate bid ) `)
            } else { // else remove bidder from active activity
                console.log( `${bidOrder[i].userId} cannot continue`)
                bidOrder.splice(i, 1)
            }
        }
    }
  return auction;
});

const Auction = model( 'Auction', auctionSchema );

module.exports = Auction;
