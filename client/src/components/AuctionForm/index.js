import React, { useState } from 'react';
import { ADD_AUCTION } from '../../utils/mutations'
import { useMutation } from '@apollo/client';
import ErrorMessage from '../ErrorMessage'

const AuctionForm = ( ) => {

    const [formState, setFormState] = useState({ title: null, description: null, reserve: 0, endDate: null });

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

    if( error ){
        return (
          <ErrorMessage />
        )
    }

    return (
        <>
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
        </>
    );
};
export default AuctionForm;
