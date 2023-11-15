import { useState, useEffect } from 'react';
import axios from 'axios'

const DisplayMovie = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://sample-deployment-1.onrender.com/display-movie")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => { console.log(err); })
    }, []);

    // const filenames = photos.map(photo => photo.filename);
    console.log(data);

    return (
        <>
            <h1> Movie Posters </h1>

            {data.map((movie, index) => (
                <div key={index}>
                    <img src={`https://sample-deployment-1.onrender.com/get-poster/${movie.moviePoster.filename}`}
                        alt={movie.title}
                        style={{ 'maxWidth': '300px', 'maxHeight': '300px' }} />

                    <h5> {movie.title} </h5>
                    <p>{movie.description}</p>
                    <h6>Release Date: {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(movie.releaseDate))}</h6>
                    <h6>Duration : {movie.duration.hours} hrs {movie.duration.minutes} mins </h6>
                    <p> Genres: </p>

                    {movie.genre.map((g, id) => (
                        <div key={id}><p>{g}</p></div>
                    ))}

                    <p> Languages : </p>

                    {movie.language.map((l, id) => (
                        <div key={id}><p>{l}</p></div>
                    ))}

                    <h6> Cast : </h6>
                    {movie.castImages.map((cast, id) => (
                        <div key={id}>
                            <img src={`https://sample-deployment-1.onrender.com/get-cast/${cast.filename}`}
                                alt={cast.name}
                                style={{ 'maxWidth': '300px', 'maxHeight': '300px' }} />

                            <h5> {cast.name} </h5>
                        </div>
                    ))}

                    <h6> Director : </h6>
                    {movie.directorImages.map((director, id) => (
                        <div key={id}>
                            <img src={`https://sample-deployment-1.onrender.com/get-director/${director.filename}`}
                                alt={director.name}
                                style={{ 'maxWidth': '300px', 'maxHeight': '300px' }} />

                            <h5> {director.name} </h5>
                        </div>
                    ))}

                </div>
            ))}
        </>
    );
}

export default DisplayMovie