//success page is a part of this, transaction cyle through pages are as follows
//In the browser, run through the checkout process. After the payment processes, you should be redirected 
//to the Success page. Three seconds later, you should be redirected to the homepage. Click the Order 
//History link in the header, and the order you just submitted will show up.
//Flow: signup to login to profile to new to auction to cart.js which has checkout along with cartItems to stripe payment
// to success to order-histroy to auctions

import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import AuctionDetail from './components/AuctionDetail';
import AddAuction from './pages/AddAuction';
import Detail from './pages/Detail';
import Home from './pages/Home';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';        


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="page-container">
        <StoreProvider>
          <Header />
          <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/new" component={AddAuction} />
            <Route exact path="/auction/:id" component={AuctionDetail} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/orderHistory" component={OrderHistory} />
            <Route exact path="/auctions/:id" component={Detail} />  
            <Route component={NoMatch} />
          </Switch>
   
          </main>
          <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
