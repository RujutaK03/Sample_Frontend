import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayTheatre = () => {
    const [theatres, setTheatres] = useState([]);

    useEffect(() => {
        axios.get('https://sample-deployment-1.onrender.com/display-theatre')
            .then((response) => setTheatres(response.data))
            .catch((error) => console.error(error))
    }, []);

    return (
        <div>
            <h1> All Theatres </h1>
            {theatres.map((theatre, index) => (
                <div key={index}>
                    <img src={`https://sample-deployment-1.onrender.com/get-theatre/${theatre.image.filename}`}
                        alt={theatre.name}
                        style={{ 'maxWidth': '300px', 'maxHeight': '300px' }} />

                    <h5> {theatre.name} </h5>
                    <h5> Location : {theatre.location} </h5>
                </div>
            ))}
        </div>
    )
}

export default DisplayTheatre;