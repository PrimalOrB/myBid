import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import OwnedAuctions from '../components/OwnedAuctions'
import OwnedBids from '../components/OwnedBids'
import { Link } from 'react-router-dom';

const Profile = () => {

  useEffect(() => {
    return () => {
      console.log("cleaned up Profile");
    };
  }, []);

  const { loading, data } = useQuery(QUERY_ME, { pollInterval: 30000 });

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

  const currentList = []
  const closedList = []
  user.auctions.map( a => {
    const current = new Date().getTime()
      if(  current < Number( a.endDate ) ) {
        return currentList.push( a )
      } else if( current > Number( a.endDate ) ){
        return closedList.push( a )
      }
      return null
    } )
  // sort list of arrays by closest expiry
  currentList.sort((a,b) => a.endDate - b.endDate)

  return (
    <>
      <div className="profile-container">
        <Link to={ '/changepw' } className='change-pw'>Change Password</Link> 
        <h1>{ `Profile component - ${ user.username } logged in` }</h1>
        <div className="profile-items">
          {/* <OwnedBids userId={ user._id }/> */}
          <OwnedAuctions auctions={ currentList } title='Active Owned Auctions'/>
          <OwnedAuctions auctions={ closedList } title='Completed Owned Auctions' type='closed'/>
        </div>
      </div>
    </>
  );
};

export default Profile;
