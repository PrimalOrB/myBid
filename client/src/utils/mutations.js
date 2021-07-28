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
export const ADD_ORDER = gql`
  mutation addOrder($auctions: [ID]!) {
    addOrder(auctions: $auctions) {
      purchaseDate
      auctions {
        _id
        name
        description
        price
        quantity
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