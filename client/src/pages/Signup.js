import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [passLengthState, setPassLengthState] = useState( false )
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    })

    checkPWLen( name, value )
  };

  const checkPWLen = ( name, value) => {
      const password = value.split('').length
      if( password >= 5 ){
          setPassLengthState( true ) 
      } else {
          setPassLengthState( false ) 
      }
}

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
  
    // use try/catch instead of promises to handle errors
    try {
      const { data } = await addUser({
        variables: { ...formState }
      });
    
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <div className="form-container input-field col s6 signup-form">
          <form onSubmit={handleFormSubmit} autoComplete="off">
            <input 
              placeholder='Your username'
              name='username'
              type='text'
              id='username'
              value={formState.username}
              onChange={handleChange}
              
            />
            <input
              placeholder='Your email'
              name='email'
              type='email'
              id='email'
              value={formState.email}
              onChange={handleChange}
            />
            <input
              placeholder='******'
              name='password'
              type='password'
              id='password'
              value={formState.password}
              onChange={handleChange}
            />
            { !passLengthState ? <div>* Password must be 5 characters long</div> :
              <button type='submit'className="btn waves-effect waves-light">
              <i className ="material-icons center"> Submit</i>
              </button>
            }
            {error && <div>* Sign up failed</div>}
          </form>
      </div>
    </>

  );
};

export default Signup;
