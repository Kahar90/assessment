import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Main code for DetailsPage UI component
const DetailsPage = () => {
    const state:any = useLocation(); // Get the state, contains our variable
   
    return (
        // Displaying the state variable
        <div className='details'>
            <h2>Details Page</h2><br />
            <p>{state.state.author.name}</p>
            <p>{state.state.title}</p>
            <p>{state.state.summary}</p>
      
        </div>
    )
}

export default DetailsPage;