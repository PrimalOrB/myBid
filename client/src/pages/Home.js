import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';


const Home = () => {

  const { data: userData } = useQuery(QUERY_ME);

  const loggedIn = Auth.loggedIn();

  return (

    <div>
      
    </div>
    
    // <>
    //     {loggedIn && userData ? (
    //       <>
    //         Logged InHome Component
    //       </>
    //     ) : 
    //       <>
    //         Logged Out Home Component
    //       </>
    //     }
    // </>
  );
};

export default Home;
