//this section has to match with queries and mutationson client side, special attention to changes to 
//product to auction and deletion of category/categories, models must match to anything here

const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`

  type Order {
    _id: ID
    purchaseDate: String
    auctions: [Auction]
  }

  input AuctionInput {
    title: String!
    description: String!
    reserve: Int
    endDate: String!
}

input BidInput {
    auctionId: ID!
    maxBid: Int!
    increment: Int!
    incrementing: Boolean!
}

type User {
    _id: ID
    username: String
    email: String
    auctions: [Auction]
    bids: [Bid]
    bidsStore: [Auction]
}

type Checkout {
    session: ID
}

type Auth {
    token: ID!
    user: User
}

type Auction {
    _id: ID
    ownerId: ID!
    createdAt: String
    title: String!
    description: String!
    reserve: Int
    endDate: String!
    paid: Boolean
    bids: [Bid]
    activeStatus: Boolean
    auctionInfo: Result
    auctionInfoStore: Result
    currentBid: Int
}

type Result {
    bidCount: Int,
    reserve: Int,
    reserveMet: Boolean,
    currentBid: Int,
    currentLeader: String,
}

type Bid {
    _id: ID
    auctionId: ID!
    createdAt: String
    userId: ID!
    maxBid: Int!
    increment: Int!
    incrementing: Boolean!
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    auctions: [Auction]
    auction(id: ID!): Auction
    auctionsByOwner: [Auction]
    order(_id: ID!): Order
    checkout(auctions: [ID]!): Checkout
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updatePassword(currentPassword: String!, newPassword: String!): Auth
    addAuction(input: AuctionInput!): User
    updateAuction(_id: ID!, input: AuctionInput!): Auction
    deleteAuction(_id: ID!): User
    addBid(input: BidInput!): Auction
    updateBid(_id: ID!, maxBid: Int!, increment: Int!): Bid
    deleteBid(_id: ID!): Auction
    addOrder(auctions: [ID]!): Order
    updatePaid(ids: [ID!]): [Auction]
}
`;

module.exports = typeDefs;