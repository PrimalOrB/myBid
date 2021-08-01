import React, { useState } from 'react';
import { ADD_BID } from '../../utils/mutations'
import { useMutation } from '@apollo/client';
import ErrorMessage from '../ErrorMessage'

const BidForm = ( _id ) => {

    const [formState, setFormState] = useState({ maxBid: _id.currentBid+1, increment: 5, incrementing: true });

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

    if( error ){
        return (
          <ErrorMessage message={ error.message }/>
        )
    }

    const handleSubmit = async event =>{
        event.preventDefault()
        let input = {
            auctionId: _id.auctionId,
            maxBid: Number( formState.maxBid ),
            increment: formState.incrementing ? Number( formState.increment ) : 1,
            incrementing: formState.incrementing
        }

        if( input.auctionId !== null && input.maxBid >= 1 && input.increment >= 1 ) {
            try {
                    await addBid({
                    variables: { 
                        input: input
                    }
                });
            
                } catch (event) {
            }
        }
    }



    if( formState.incrementing ) {
        return (
        <>
        <form name="bid-form" className='bid-form' autoComplete="off" onSubmit={ handleSubmit }>
            <label htmlFor="incrementing">Automatic Bidding</label>
            <input type="checkbox" name="incrementing" onChange={ handleChange } defaultChecked={ formState.incrementing === true && true }/>
            <label htmlFor="maxBid" onChange={ handleChange }>Maximum Bid</label>
            <input type="number" name="maxBid" min="1" onChange={ handleChange } defaultValue={ formState.maxBid === "" ? 5 : formState.maxBid }/>
            <label htmlFor="increment">Increment Bids By</label>
            <input type="number" name="increment" min="1" onChange={ handleChange } defaultValue={ formState.increment === "" ? 5 : formState.increment }/>
            { formState.maxBid > _id.currentBid ? 
                <button type="submit">Add Bid!</button>
                :
                <div>* New bid must be greater than current bid</div>
            }
        </form>
        </>
        )
    }


    return (
        <>
            <form name="bid-form" className='bid-form' autoComplete="off" onSubmit={ handleSubmit }>
                <label htmlFor="incrementing">One-Time Bid</label>
                <input type="checkbox" name="incrementing" onChange={ handleChange } defaultChecked={ formState.incrementing === true && true }/>
                <label htmlFor="maxBid" onChange={ handleChange }>Bid value</label>
                <input type="number" name="maxBid" min="1" onChange={ handleChange }/>
                { formState.maxBid > _id.currentBid ? 
                <button type="submit">Add Bid!</button>
                :
                <div>* New bid must be greater than current bid</div>
            }
            </form>
        </>
    );
};
export default BidForm;
