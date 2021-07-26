const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`
type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
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
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    me: User
    users: [User]
    user(username: String!): User
    auctions: [Auction]
    auction(id: ID!): Auction
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
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
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
}
`;

module.exports = typeDefs;