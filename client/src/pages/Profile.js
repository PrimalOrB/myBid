import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import AuctionForm from '../components/AuctionForm'

const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME, {
    variables: {}
  });

  const user = data?.me || data?.user || {};
 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <div className="add-auction-container">
        { `Profile component - ${ user.username } logged in` }
        <AuctionForm />
      </div>
    </>
  );
};

export default Profile;
