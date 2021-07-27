const auctionObj = {
    bidCount: 0,
    reserve: 500,
    reserveMet: false,
    currentBid: 0,
    currentLeader: null,
}

const biddersArr = [
    {
        userId: "bidder 1",
        maxBid: 400,
        increment: 10,
        createdAt: 11111,
        incrementing: true
    },
    {
        userId: "bidder 2",
        maxBid: 520,
        increment: 25,
        createdAt: 111113,
        incrementing: false
    },
    {
        userId: "bidder 3",
        maxBid: 450,
        increment: 1,
        createdAt: 111114,
        incrementing: false
    },
    {
        userId: "bidder 4",
        maxBid: 140,
        increment: 50,
        createdAt: 111115,
        incrementing: true
    },
    {
        userId: "bidder 5",
        maxBid: 550,
        increment: 10,
        createdAt: 111116,
        incrementing: true
    }
]

function processAuction( auction, bidders ){
    let bidOrder = bidders.sort( ( a, b ) => a.createdAt - b.createdAt )
    for( let i = 0; i < bidOrder.length; i++){
        //for first bidder, do their initial bid
        if( i === 0 ){
            if( !bidOrder[i].incrementing ) { // if one time bid
                auction.bidCount +=1
                auction.currentBid = bidOrder[i].maxBid 
                auction.reserveMet = auction.currentBid >= auction.reserve
                auction.currentLeader = bidOrder[i].userId
            } else if ( bidOrder[i].incrementing ) { // if incrementing bid
                auction.bidCount +=1
                auction.currentBid = auction.currentBid + bidOrder[i].increment 
                auction.reserveMet = auction.currentBid >= auction.reserve
                auction.currentLeader = bidOrder[i].userId
            }
        }
        // for next bidder in timeline, increment their bids
        let activeBidders = bidOrder.filter( x => x.createdAt <= bidOrder[i].createdAt ) // find users who bid before current user
        while( activeBidders.length > 1 ){
            activeBidders.map( ( bid, index ) => {
                if( !bid.incrementing && bid.maxBid > auction.currentBid  ) { // if one time bid and bid greater than current bid
                    auction.bidCount +=1
                    auction.currentBid = bid.maxBid 
                    auction.reserveMet = auction.currentBid >= auction.reserve
                    auction.currentLeader = bid.userId
                } else if ( auction.currentBid + bid.increment <= bid.maxBid && bid.incrementing === true) { // if incrementing bid
                    auction.bidCount +=1
                    auction.currentBid = auction.currentBid + bid.increment 
                    auction.reserveMet = auction.currentBid >= auction.reserve
                    auction.currentLeader = bid.userId
                } else {
                    activeBidders.splice( index, 1)
                }
            })

        }
    }

    console.log( bids, auction )
    //     console.log( auction )
}
processAuction( auctionObj, biddersArr )