//this will need additions for cart
//Need to create product list and item page 
//also need respective models
//need to fix app.js in end

import { gql } from '@apollo/client';

//this may need revision
export const QUERY_AUCTIONS = gql`
  query getauctions($auction: ID) {
    auctions(auction: $auction) {
      _id
      name
      description
      price
      quantity
      image
    }
  }
`;

//this is main query for creating session id with stripe for front end, need all product ids to submit 
export const QUERY_CHECKOUT = gql`
  query getCheckout($auctions: [ID]!) {
    checkout(auctions: $auctions) {
      session
    }
  }
`;

export const QUERY_ALL_AUCTIONS = gql`
  {
   auctions {
      _id
      name
      description
      price
      quantity
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_AUCTIONS = gql`
  query auctions {
    auctions{
      _id
      ownerId
      title
      description
      reserve
      createdAt
      endDate
      activeStatus
      auctionInfo {
        bidCount
        reserveMet
        currentBid
        currentLeader
      }
      bids {
        _id
        userId
        auctionId
        maxBid
        increment
        incrementing
      }
    }
  }
`;

export const QUERY_AUCTION = gql`
  query auction($id: ID!) {
    auction(id: $id){
      _id
      ownerId
      title
      description
      reserve
      endDate
      activeStatus
      auctionInfo {
        bidCount
        reserveMet
        currentBid
        currentLeader
      }
      bids {
        _id
        userId
        auctionId
        maxBid
        increment
        incrementing
      }
    }
  }
`;