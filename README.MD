# myBid working notes

## Contents
- [Server environment variables](env)
- [Queries - back end](queries)
- [Mutations - back end](mutations)
- [Auction function](auction)

## ENV
in server.js
- include .env in `server` root directory with key : AUTH_SECRET=.... (whatever you want)

## Queries
- me: User
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/6)
- users: [User]
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/6)
- user(username: String!): User
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/6)
- auctions: [Auction]
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/7)
- auction(id: ID!): Auction
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/7) 
  
## Mutations
- login(email: String!, password: String!): Auth
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/6)
- addUser(username: String!, email: String!, password: String!): Auth
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/6)
- updatePassword(currentPassword: String!, newPassword: String!): Auth
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/6)
- addAuction(input: AuctionInput!): User
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/7) 
- updateAuction(_id: ID!, input: AuctionInput!): Auction
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/7) 
- deleteAuction(_id: ID!): User
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/7) 
- addBid(input: BidInput!): Auction
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/9) 
- updateBid(_id: ID!, maxBid: Int!, increment: Int!): Bid
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/9) 
- deleteBid(_id: ID!): Auction
   - [example of use from github issue](https://github.com/PrimalOrB/myBid/issues/9) 

## Auction
- Each auction function is controlled within the Auction model as a virtual
- As bids are pushed into the Auction: bids array, it calculates the current state of the auction
- Important information which will be required:
   - activeStatus - this compares current date to the endDate to see if the auction is still active (Boolean return)
   - auctionInfo - this is the proccessing of the auction, and includes info:
      - bidCount (number of bids cycled through the automated function)
      - reserve (the reserve value of the auction)
      - reserveMet (if the reserve is met by current bid parameters) Boolean
      - currentBid (the currentBid which is determined through the automated function)
      - currentLeader (the _id of the user who is currently leading the auction)
- This this data, we could explore such info on the front end as:
  - cards on the main page of all active auctions (by searching only ones with ``activeStatus: true`` )
  - determine winners of auctions (closed auctions for auction owner, and auction bidders) by seeing ``activeStatus: false`` and ``currentLeader`` / ``currentBid`` (for payment purposes)  ** when ``reserveMet`` is true
