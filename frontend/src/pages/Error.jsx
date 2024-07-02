import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link, useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
    let message = 'Error Occured!';
    console.log('error',error);
    if(error.data.message != ''){
        message = error.data.message;
    }
    return (
        <div className='flex-col justify-center items-center h-screen'>
            <FaExclamationTriangle className='w-16 h-16 mx-auto mt-24'/>
            <p className='font-bold text-lg py-10'>{message}</p>
            <Link to='/'><button className='btn-primary'>Go Back Home</button></Link>
        </div>
    )
}

export default Error