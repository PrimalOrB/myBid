import { gql } from '@apollo/client';

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