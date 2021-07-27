import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BID = gql`
  mutation addBid($input: BidInput!) {
    addBid(input: $input) {
      _id
    }
  }
`;

export const ADD_AUCTION = gql`
  mutation addAuction($input: AuctionInput!) {
    addAuction(input: $input) {
      _id
      auctions{
        _id
        title
        description
        ownerId
        reserve
        endDate
      }
    }
  }
`;