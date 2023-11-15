import React, { useState } from 'react';

const AddTheatre = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: undefined,
        location: '',
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newTheatre = new FormData();
            newTheatre.append("name", formData.name);
            newTheatre.append("image", formData.image);
            newTheatre.append("location", formData.location);

            const response = await fetch('https://sample-deployment-1.onrender.com/add-theatre', {
                method: 'POST',
                body: newTheatre,
            });

            if (response.ok) {
                alert("Theatre Added Successfully!");
            } else {
                console.error('Failed to add new theatre');
            }
        } catch (error) {
            console.error('Error :', error);
        }
    }

    return (
        <div>
            <h1> Add a Theatre </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'> Theatre Name : </label>
                <input type='text' id='name' name='name' value={formData.name} onChange={handleInputChange} /><br /><br />
                <label htmlFor='image'> Theatre Image : </label>
                <input type='file' accpet='image/*' id='image' name='image' onChange={handleImageChange} /><br /><br />
                <label htmlFor='name'> Theatre Location : </label>
                <input type='text' id='location' name='location' value={formData.location} onChange={handleInputChange} /><br /><br />

                <button type='submit' onSubmit={handleSubmit}> Add Theatre </button>
            </form>
        </div>
    )
}

export default AddTheatre;