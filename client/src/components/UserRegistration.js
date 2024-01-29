import React, { useState } from 'react';
import axios from 'axios';
import './UserRegistration.css'; // Make sure to create this CSS file

const UserRegistration = ({ onClose }) => {
    const [formData, setFormData] = useState({
                                                 username: '',
                                                 email: '',
                                                 password: '',
                                             });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const validateForm = () => {
        let errors = {};
        if (!formData.username) errors.username = 'Username is required';
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!formData.password) errors.password = 'Password is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            setIsSubmitting(true);
            try {
                // Replace with your actual API endpoint
                const response = await axios.post('http://localhost:5000/api/register', formData);
                console.log(response.data);
                // Handle success (e.g., show success message, redirect, etc.)
            } catch (error) {
                // Handle error (e.g., show error message)
                console.error('Registration error:', error);
            }
            setIsSubmitting(false);
        }
    };

    return (
        <div className="registration-page">
            <div className="registration-form-container">
                <h2>Register Here</h2>
                <form onSubmit={handleSubmit} className="registration-form">
                    <input type="text" placeholder="Name" name="name" />
                    <input type="text" placeholder="Username" name="username" />
                    <input type="email" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button type="submit" className="register-btn">Register</button>
                </form>
            </div>
        </div>
    );
};

export default UserRegistration;
