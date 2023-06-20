import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Error.css'

const Error = () => {
  return (
    <>
        <main className='main'>
            <h1>An error occured!</h1>
            <p>Could not find this page.</p>
        </main>
    </>
  );
};

export default Error;