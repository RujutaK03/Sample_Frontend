import React, { useState } from 'react';

const AddMovie = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        releaseDate: "",
        moviePoster: undefined,
        duration: "",
        cast: [],
        director: [],
        castImages: [],
        directorImages: [],
        genre: [],
        language: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleImageChange = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
        setFormData((prevFormData) => ({ ...prevFormData, [name]: file }));
    };

    const handleMultipleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value.split(",") }));
    }

    // const handleMultipleImages = (event, index) => {
    //     const { name } = event.target;
    //     const file = event.target.files[0];
    //     setFormData((prevFormData) => ({
    //         ...prevFormData, [`${name}_${index}`]: file, [`${name}`]: [...(prevFormData[name] || []), file],
    //     }));
    // }

    const handleMultipleImages = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: [
                ...(prevFormData[[name]] || []),
                file,
            ]
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(formData);

        try {
            const newMovie = new FormData();

            newMovie.append("title", formData.title);
            newMovie.append("description", formData.description);
            newMovie.append("releaseDate", formData.releaseDate);
            newMovie.append("moviePoster", formData.moviePoster);
            newMovie.append("duration", formData.duration);

            // formData.cast.forEach((member, index) => {
            //     newMovie.append(`cast[${index}]`, member);
            //     if (formData.castImages[index]) {
            //         newMovie.append(`castImages[${index}]`, formData.castImages[index]);
            //     }
            // });

            // formData.director.forEach((member, index) => {
            //     newMovie.append(`director[${index}]`, member);
            //     if (formData.directorImages[index]) {
            //         newMovie.append(`directorImages[${index}]`, formData.directorImages[index]);
            //     }
            // });

            formData.cast.forEach((member, index) => {
                newMovie.append(`cast[${index}]`, member);
                newMovie.append(`castImages`, formData.castImages[index]);
            });

            formData.director.forEach((member, index) => {
                newMovie.append(`director[${index}]`, member);
                newMovie.append(`directorImages`, formData.directorImages[index]);
            });

            formData.genre.forEach((g, index) => {
                newMovie.append(`genres[${index}]`, g);
            });

            formData.language.forEach((lang, index) => {
                newMovie.append(`languages[${index}]`, lang);
            });

            // for (const pair of newMovie.entries()) {
            //     console.log(pair[0] + ', ' + pair[1]);
            // }

            const response = await fetch('https://sample-deployment-1.onrender.com/add-movie', {
                method: 'POST',
                body: newMovie,
            });

            if (response.ok) {
                alert("Movie Added Successfully!");
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <h1>Add A Movie</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title"> Title of the Movie : </label>
                <input type='text' id='title' name='title' value={formData.title} onChange={handleInputChange} required /><br /><br />
                <label htmlFor="moviePoster"> Movie Poster : </label>
                <input type='file' accpet="image/*" id='moviePoster' name='moviePoster' onChange={handleImageChange} required /><br /><br />
                <label htmlFor="releaseDate"> Release Date : </label>
                <input type='date' id='releaseDate' name='releaseDate' value={formData.releaseDate} onChange={handleInputChange} required /><br /><br />
                <label htmlFor='description'> Description of Movie : </label>
                <textarea id='description' name='description' value={formData.description} onChange={handleInputChange} /><br /><br />
                <label htmlFor='duration'> Duration : </label>
                <input type='time' id='duration' name='duration' value={formData.duration} onChange={handleInputChange} /><br /><br />

                <label htmlFor='genre'> Genre(s) (comma-separated) : </label>
                <input type='text' id='genre' name='genre' value={formData.genre} onChange={handleMultipleChange} /><br /><br />

                <label htmlFor='language'> Language(s) (comma-separated) : </label>
                <input type='text' id='language' name='language' value={formData.language} onChange={handleMultipleChange} /><br /><br />

                <label htmlFor='cast'> Cast (comma-separated) : </label>
                <input type='text' id='cast' name='cast' value={formData.cast} onChange={handleMultipleChange} /><br /><br />

                {formData.cast.map((member, index) => (
                    <div key={index}>
                        <label htmlFor={`castImages${index}`}> Image for {member} : </label>
                        <input type='file' accept='image/*' id={`castImages${index}`} name='castImages' onChange={(event) => handleMultipleImages(event)} /><br /><br />
                    </div>
                ))}

                <label htmlFor='director'> Director(s) (comma-separated) : </label>
                <input type='text' id='director' name='director' value={formData.director} onChange={handleMultipleChange} /><br /><br />

                {formData.director.map((member, index) => (
                    <div key={index}>
                        <label htmlFor={`directorImages${index}`}> Image for {member} : </label>
                        <input type='file' accept='image/*' id={`directorImages${index}`} name='directorImages' onChange={(event) => handleMultipleImages(event)} /><br /><br />
                    </div>
                ))}

                <button type='submit'> Add Movie </button>
            </form>
            {/* <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload Image</button> */}
        </div>
    );
};

export default AddMovie;