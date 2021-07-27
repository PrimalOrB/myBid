import React, { useState } from 'react';
import { ADD_BID } from '../../utils/mutations'
import { useMutation } from '@apollo/client';

const BidForm = ( _id, currentBid  ) => {

    const [formState, setFormState] = useState({ maxBid: 5, increment: 5, incrementing: true });

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        if( type === 'checkbox' ){
            setFormState({
                ...formState,
                [name]: event.target.checked,
              })
        } else {
            setFormState({
              ...formState,
              [name]: Number( value ),
            })
        }
    };

    const [ addBid, { error }] = useMutation(ADD_BID, {
        update() {
            try {
                window.location.reload();
            } catch (e) {
                console.error(e);
            }
        }
      });

    const handleSubmit = async event =>{
        event.preventDefault()
        let input = {
            auctionId: _id.auctionId,
            maxBid: Number( formState.maxBid ),
            increment: formState.incrementing ? Number( formState.increment ) : 1,
            incrementing: formState.incrementing
        }

        console.log( input )
        try {

            await addBid({
                variables: { 
                    input: input
                }
            });
        
            } catch (event) {
        }
    }



    if( formState.incrementing ) {
        return (
        <form name="bid-form" className='bid-form' autoComplete="off" onSubmit={ handleSubmit }>
            <label htmlFor="incrementing">Automatic Bidding</label>
            <input type="checkbox" name="incrementing" onChange={ handleChange } defaultChecked={ formState.incrementing === true && true }/>
            <label htmlFor="maxBid" onChange={ handleChange }>Maximum Bid</label>
            <input type="number" name="maxBid" min="1" onChange={ handleChange } defaultValue={ formState.maxBid === "" ? 5 : formState.maxBid }/>
            <label htmlFor="increment">Increment Bids By</label>
            <input type="number" name="increment" min="1" onChange={ handleChange } defaultValue={ formState.increment === "" ? 5 : formState.increment }/>
            <button type="submit">Add Bid!</button>
        </form>
        )
    }


    return (
        <>
            <form name="bid-form" className='bid-form' autoComplete="off" onSubmit={ handleSubmit }>
                <label htmlFor="incrementing">One-Time Bid</label>
                <input type="checkbox" name="incrementing" onChange={ handleChange } defaultChecked={ formState.incrementing === true && true }/>
                <label htmlFor="maxBid" onChange={ handleChange }>Bid value</label>
                <input type="number" name="maxBid" min="1" onChange={ handleChange }/>
                <button type="submit">Add Bid!</button>
            </form>
        </>
    );
};
export default BidForm;