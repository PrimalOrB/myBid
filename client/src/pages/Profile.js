import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import OwnedAuctions from '../components/OwnedAuctions'
import OwnedBids from '../components/OwnedBids'
import { Link } from 'react-router-dom';

const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME, {
    variables: {}
  });

  const user = data?.me || data?.user || {};

  console.log( user )
 
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
      <div className="profile-container">
        <h1>{ `Profile component - ${ user.username } logged in` }</h1>
        <Link to={ '/changepw' }>Change Password</Link>
        <div className="profile-items">
          <OwnedAuctions userId={ user._id }/>
          <OwnedBids userId={ user._id }/>
        </div>
      </div>
    </>
  );
};

export default Profile;
