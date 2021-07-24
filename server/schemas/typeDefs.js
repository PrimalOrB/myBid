const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`

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
    bids: [Bid]
    activeStatus: Boolean
    auctionInfo: Result
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
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAuction(input: AuctionInput!): User
    updateAuction(_id: ID!, input: AuctionInput!): Auction
    addBid(input: BidInput!): Auction
    updateBid(_id: ID!, maxBid: Int!, increment: Int!): Bid
    deleteBid(_id: ID!): Auction
}
`;

module.exports = typeDefs;