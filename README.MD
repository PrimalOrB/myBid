# myBid Auction Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

MERN Full Stack SPA: An auction platform with social features allowing anyone to create and bid on auctions. Once you’ve won an auction pay using Stripe or any Cryptocurrency.

## Table Of Contents

- [Features](#features)
- [Screenshot](#screenshot)
- [Deployment](#deployment)
- [Built Using](#built)
- [License](#license)
- [Contribution](#contribution)
- [Questions](#questions)

## Features

- Users can sign up for accounts
  - Users will receive an email upon signup
  - Passwords are hashed and stored in db
- Users can login securely to their account
  - Passwords are verified and decrypted on the server
- Users can create new Auctions
  - Describe with title, description, reserve price, and end date/time
  - Users will receive an email when creating a new auction
- Users can bid on current active Auctions
  - Automatic bidding: define max bid an increment value, and allow the server to process automatic incrementing where possible
  - One-time bid: place a single bid at a set value
  - Users will receive an email when adding a new bid
- Users can re-bid on current active Auctions
  - If a user gets outbid, they can re-bid
- Monitor Auctions / Bids
  - In the users profile, they can monitor auctions they are currently active in bidding, and can see if they are leading or not
  - In the users profile, they can monitor auctions they own, to show current prices
    - Auction owners can update the description, or lower the reserve price of their auctions
  - In the users profile, they can monitor closed / completed auctions that they own
  - In the users profile, they can monitor completed auctions they have been active in bidding

## Screenshot
![image](https://user-images.githubusercontent.com/69044956/127777775-cda42ade-9608-405d-9dfb-7d51b8fcb203.png)

## Deployment

[Deployed on Heroku](https://mybid-live.herokuapp.com/)

## Built

- [MongoDB / Mongoose](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Apollo](https://www.npmjs.com/package/apollo)
- [GraphQL](https://graphql.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [stripe](https://stripe.com/docs/js/including)
- [nodemailer](https://nodemailer.com/about/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## License

This application is covered under the [MIT](https://opensource.org/licenses/MIT) license.

## Contribution

- There is no contribution required for this project

## Questions

Built by:

- [Andrew Ogilvie](https://github.com/PrimalOrB)
- [Jon Waaler](https://github.com/JonWaaler)
- [Jessica Jeyanthiran](https://github.com/JessicaJeyanthiran)
- [Johny Matharu]("https://github.com/JohnnyMatharu)
- [Jeff Grant](https://github.com/JeffGrant274)
