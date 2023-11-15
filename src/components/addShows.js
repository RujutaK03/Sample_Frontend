import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddShows = () => {
    const [movies, setMovies] = useState([]);
    const [theatres, setTheatres] = useState([]);
    const [formData, setFormData] = useState({
        movieId: '',
        theatreId: '',
        showTimes: [''],
        ticketPrice: 0,
    });

    useEffect(() => {
        axios.get('https://sample-deployment-1.onrender.com/movies')
            .then(response => setMovies(response.data))
            .catch(error => console.error(error));

        axios.get('https://sample-deployment-1.onrender.com/theatres')
            .then(response => setTheatres(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleShowTimeChange = (index, value) => {
        setFormData(prevFormData => {
            const newShowTimes = [...prevFormData.showTimes];
            newShowTimes[index] = value;
            return {
                ...prevFormData,
                showTimes: newShowTimes,
            };
        });
    };

    const handleAddShowTime = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            showTimes: [...prevFormData.showTimes, ''],
        }));
    };

    const handleRemoveShowTime = (index) => {
        setFormData(prevFormData => {
            const newShowTimes = [...prevFormData.showTimes];
            newShowTimes.splice(index, 1);
            return {
                ...prevFormData,
                showTimes: newShowTimes,
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const Shows = new FormData();
            Shows.append('movieId', formData.movieId);
            Shows.append('theatreId', formData.theatreId);
            Shows.append('ticketPrice', formData.ticketPrice);

            formData.showTimes.forEach((time, index) => {
                Shows.append(`showTimes[${index}]`, time);
            });

            for (const pair of Shows.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            const response = await fetch('https://sample-deployment-1.onrender.com/add-shows', {
                method: 'POST',
                body: Shows,
            });

            if (response.ok) {
                alert("Shows Added Successfully!");
            } else {
                console.error('Failed to add shows');
            }
        } catch (error) {
            console.error('Error : ', error);
        }
    };

    return (
        <div>
            <h1> Add Shows </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='movieId'> Select Movie : </label>
                <select id="movieId" name="movieId" value={formData.movieId} onChange={handleInputChange} required>
                    <option value=""> Select a movie </option>
                    {movies.map((movie) => (
                        <option key={movie._id} value={movie._id}> {movie.title} </option>
                    ))}
                </select><br /><br />

                <label htmlFor='theatreId'> Select Theatre : </label>
                <select id="theatreId" name="theatreId" value={formData.theatreId} onChange={handleInputChange} required>
                    <option value=""> Select a theatre </option>
                    {theatres.map((theatre) => (
                        <option key={theatre._id} value={theatre._id}> {theatre.name} </option>
                    ))}
                </select><br /><br />

                <label htmlFor='ticketPrice'> Price per Ticket : </label>
                <input type='number' id='ticketPrice' name='ticketPrice' value={formData.ticketPrice} onChange={handleInputChange} required /><br /><br />
                {formData.showTimes.map((showTime, index) => (
                    <div key={index}>
                        <label htmlFor={`showTime${index + 1}`}>{`Show Time ${index + 1} :`}</label>
                        <input
                            type="time"
                            id={`showTime${index + 1}`}
                            name={`showTime${index + 1}`}
                            value={showTime}
                            onChange={(event) => handleShowTimeChange(index, event.target.value)}
                            required
                        />

                        {index > 0 && (
                            <button type="button" onClick={() => handleRemoveShowTime(index)}> Remove </button>
                        )}
                    </div>
                ))}

                <button type="button" onClick={handleAddShowTime}> Add Show Time </button><br /><br />

                <button type="submit"> Add Shows </button>
            </form>
        </div>
    )

}

export default AddShows;