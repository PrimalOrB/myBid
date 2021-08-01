import React from 'react';

const ErrorMessage = ( { message } ) => {
  return (
    <h1>Error{ message && `: ${ message }` }</h1>
  )
};

export default ErrorMessage;
