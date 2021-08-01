import React, { useState, useEffect } from 'react';
import { ADD_AUCTION, UPDATE_AUCTION } from '../../utils/mutations'
import { QUERY_AUCTION } from '../../utils/queries'
import { useMutation, useQuery } from '@apollo/client';
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading';

const AuctionForm = ( { mode, auction } ) => {

    const initialState = {
        title: null, 
        description: null, 
        reserve: null, 
        endDate: null
    }

    const [formState, setFormState] = useState( initialState );

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

    const [ editAuction, { error2 }] = useMutation(UPDATE_AUCTION, {
        update() {
            try {
                window.location.replace('/');
            } catch (e) {
                console.error(e);
            }
        }
    });

    const handleEdit = async event =>{
        event.preventDefault()
        let input = {
            title: formState.title,
            description: formState.description,
            reserve: Number( formState.reserve ),
            endDate: formState.endDate
        }
        if( input.title && input.description && input.reserve && input.endDate) {
            try {
                await editAuction({
                    variables: { 
                        _id: auction.id,
                        input: input
                    }
                });
            
                } catch (event) {
            }
        }
    } 

    const { loading, data } = useQuery(QUERY_AUCTION,{
        variables: { id: !auction ? '' : auction.id  }
    });

    const auctionData = data?.auction || {...initialState}

    useEffect(() => {
        setFormState( {
            title: auctionData.title, 
            description: auctionData.description, 
            reserve: auctionData.reserve, 
            endDate: auctionData.endDate
        } )
    },[auctionData])

    if (loading) {
        return <Loading/>;
    }

    if( error ){
        return (
          <ErrorMessage />
        )
    }

    if( mode === 'edit' ){
        return(
            <>
                <form name="auction-form" className='auction-form' autoComplete="off" onSubmit={ handleEdit }>
                    <label htmlFor="title" onChange={ handleChange }>Title</label>
                    <input type="text" name="title" defaultValue={ formState.title === null ? initialState.title : formState.title } disabled/>
                    <label htmlFor="description" onChange={ handleChange }>Description</label>
                    <input type="text" name="description" defaultValue={ formState.description === null ? initialState.description : formState.description } onChange={ handleChange }/>
                    <label htmlFor="reserve" onChange={ handleChange }>Reserve value</label>
                    <input type="number" name="reserve" min="0" defaultValue={ formState.reserve === null ? initialState.reserve : Number( formState.reserve ) } onChange={ handleChange }/>
                    <label htmlFor="endDate" onChange={ handleChange }>End Date/Time</label>
                    <input type="text" name="endDate" placeholder={ formState.endDate === null ? '' : new Date( Number( formState.endDate ) ).toLocaleString() } onChange={ handleChange } disabled/>
                    { ( formState.reserve > auctionData.reserve ) && <div>* Cannot Increase Reserve</div> }
                    { !( formState.reserve > auctionData.reserve ) && <button type="submit">Update Auction!</button> }
                </form>
            </>
        );
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
