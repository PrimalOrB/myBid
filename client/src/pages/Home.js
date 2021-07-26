import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";


const Home = () => {

  const { data: userData } = useQuery(QUERY_ME);

  const loggedIn = Auth.loggedIn();

  return (
    <>
        {loggedIn && userData ? (
          <>
            Logged InHome Component
          </>
        ) : 
          <>
            Logged Out Home Component
          </>
        }
    <div className="container">
    <CategoryMenu />
    <ProductList />
    <Cart />
  </div>
    </>
  

  );
};

export default Home;
