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

//this here needs to be checked for argument names 
export const UPDATE_PAID = gql`
  mutation updatePaid($ids: [ID!]) {
    updatePaid(ids: $ids) {
      _id
      paid
      title
      description
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

export const CHANGE_PASSWORD = gql`
  mutation updatePassword($currentPassword: String!, $newPassword: String!){
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword){
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_AUCTION = gql`
  mutation updateAuction($_id: ID!, $input: AuctionInput!) {
    updateAuction(_id: $_id, input: $input) {
      _id
      ownerId
      title
      description
      reserve
      endDate
      activeStatus
      bids{
        _id
      }
      auctionInfo{
        bidCount
        reserveMet
        reserve
        currentBid
        currentLeader
      }
    }
  }
`;