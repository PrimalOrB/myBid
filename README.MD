# myBid working notes

## Contents
- [Server environment variables](env)
- [Queries - back end](queries)
- [Mutations - back end](mutations)

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
}
