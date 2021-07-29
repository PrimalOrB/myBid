import React, { useState } from 'react';
import { CHANGE_PASSWORD } from '../../utils/mutations'
import { useMutation } from '@apollo/client';
import ErrorMessage from '../ErrorMessage'

const ChangePasswordForm = ( ) => {

    const [formState, setFormState] = useState( { currentPassword: null, newPassword: null, newPasswordRe: null } );
    const [matchingPassState, setMatchingPassState] = useState( false )
    const [passLengthState, setPassLengthState] = useState( false )

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormState({
            ...formState,
            [name]: value ,
        })
        checkPW( name, value )
        checkPWLen( name, value )
    };
    
    const checkPW = ( name, value ) => {
        if( name === 'newPassword' ){
            if( value === formState.newPasswordRe ){
                setMatchingPassState( true) 
            } else {
                setMatchingPassState( false ) 
            }
        } else if ( name === 'newPasswordRe' ) {
            if( formState.newPassword === value ){
                setMatchingPassState( true) 
            } else {
                setMatchingPassState( false ) 
            }
        }
    }

    const checkPWLen = ( name, value) => {
        if( name === 'newPassword' ){
            const newPassLen = value.split('').length
            const newPassLenRe = formState.newPasswordRe ? formState.newPasswordRe.split('').length : 0
            if( newPassLen >= 5 && newPassLenRe >=5 ){
                setPassLengthState( true) 
            } else {
                setPassLengthState( false ) 
            }
        } else if ( name === 'newPasswordRe' ) {
            const newPassLen = formState.newPassword ? formState.newPassword.split('').length : 0
            const newPassLenRe = value.split('').length
            if( newPassLen >= 5 && newPassLenRe >=5 ){
                setPassLengthState( true) 
            } else {
                setPassLengthState( false ) 
            }
        }
   }

    const [ updatePW, { error }] = useMutation(CHANGE_PASSWORD, {
        update() {
            try {
                window.location.replace('/profile');
            } catch (e) {
                console.error(e);
            }
        }
    });

    const handleSubmit = async event =>{
        event.preventDefault()
        let currentPassword= formState.currentPassword
        let newPassword= formState.newPassword
        let newPasswordRe= formState.newPasswordRe

        if( currentPassword && newPassword && newPasswordRe ) {
            try {
                await updatePW({
                    variables: { 
                        currentPassword: currentPassword,
                        newPassword: newPassword,
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
            <form name="password-form" className='password-form' autoComplete="off" onSubmit={ handleSubmit }>
                <label htmlFor="currentPassword" onChange={ handleChange }>Current Password</label>
                <input type="password" name="currentPassword" onChange={ handleChange }/>
                <label htmlFor="newPassword" onChange={ handleChange }>New Password</label>
                <input type="password" name="newPassword" onChange={ handleChange }/>
                <label htmlFor="newPasswordRe" onChange={ handleChange }>Re-type New Password</label>
                <input type="password" name="newPasswordRe" onChange={ handleChange }/>
                { !passLengthState && <div>Password must be 5 characters long</div> }
                { !matchingPassState && <div>New passwords do not match</div> }
                { ( matchingPassState && passLengthState ) && <button type="submit">Change Password</button>  }
            </form>
        </>
    );
};
export default ChangePasswordForm;
