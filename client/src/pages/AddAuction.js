import React from 'react';
import Auth from '../utils/auth';
import Loading from '../components/Loading'
import AuctionForm from '../components/AuctionForm';
import { useParams } from 'react-router-dom';

const AddAuction = ( ) => {

        // check for params. if yes, is edit form. if no, is new form
    const { id: _id } = useParams();

    const loggedIn = Auth.loggedIn();

    return (
        <>
        { ( !loggedIn ) && <Loading /> }
        { ( loggedIn && !{id: _id }.id ) && <><h1>Create New Auction</h1><AuctionForm /></> }
        { ( loggedIn && {id: _id }.id ) && <><h1>Edit Auction</h1><AuctionForm mode={ 'edit' } auction={ { id: _id } }/></> }
        
        </>
    );
};
export default AddAuction;
