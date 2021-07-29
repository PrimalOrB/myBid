import React, { useState } from 'react';
import { ADD_AUCTION } from '../utils/mutations'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const AddAuction = ( ) => {

    const loggedIn = Auth.loggedIn();

    const [formState, setFormState] = useState({ title: '', description: '', reserve: 0, endDate: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value ,
        })
    };

    const [ addAuction, { error }] = useMutation(ADD_AUCTION, {
        update() {
            try {
                window.location.replace('/');
            } catch (e) {
                console.error(e);
            }
        }
    });

    if( error ){
        return (
            <ErrorMessage />
        )
    }
      

    const handleSubmit = async event =>{
        event.preventDefault()
        let input = {
            title: formState.title,
            description: formState.description,
            reserve: Number( formState.reserve ),
            endDate: formState.endDate
        }

        if( input.title && input.description && input.reserve && input.endDate) {
            try {
                await addAuction({
                    variables: { 
                        input: input
                    }
                });
            
                } catch (event) {
            }
        }
    }

    return (
        <>
        { loggedIn ? (
            <form name="auction-form" className='auction-form' autoComplete="off" onSubmit={ handleSubmit }>
                <label htmlFor="title" onChange={ handleChange }>Title</label>
                <input type="text" name="title" onChange={ handleChange }/>
                <label htmlFor="description" onChange={ handleChange }>Description</label>
                <input type="text" name="description" onChange={ handleChange }/>
                <label htmlFor="reserve" onChange={ handleChange }>Reserve value</label>
                <input type="number" name="reserve" min="0" onChange={ handleChange }/>
                <label htmlFor="endDate" onChange={ handleChange }>End Date/Time</label>
                <input type="datetime-local" name="endDate" onChange={ handleChange }/>
                <button type="submit">Add New Auction!</button>
            </form>
        ) : (
            <Loading />
        )}
        </>
    );
};
export default AddAuction;
