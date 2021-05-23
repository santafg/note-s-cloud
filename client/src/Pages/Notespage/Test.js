import React from 'react';
import {Link} from 'react-router-dom'

const Test = () => {
    return (
        <>
        <div className='errorContainer'>
            
            <h1>404 Error !</h1>
            <Link to='/'>
                Back to home
            </Link>
        </div>
        </>
    )
}

export default Test
