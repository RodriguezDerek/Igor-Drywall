import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorToast from '../components/ErrorToast';
import SuccessToast from '../components/SuccessToast';

function Register() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
            setErrorMessage("All fields are required.");
            return;
        }

        if(formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            })

            const data = await response.json();

            if(response.ok){
                setSuccessMessage(data.message);
                setTimeout(() => {
                        window.location.href = "/login";
                    }, 2000); // wait 2 seconds before redirecting

            } else {
                setErrorMessage(data.message || "An error occurred during registration.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while creating your account. Please try again later.");
        }
    }

    return (
        <>
        <div className="flex h-screen">
        
            {/* LEFT SIDE - Form */}
            <div className="w-2/4 relative flex flex-col px-16 py-12 justify-start bg-white">
    
                {/* Logo in top-left */}
                <Link to="/" className="absolute top-5 left-5 w-50 block">
                    <img src="/logo.png" alt="Logo" className="w-full h-auto" />
                </Link>

                {/* Header */}
                <h1 className="text-center text-4xl font-semibold custom-red-color-text mb-6 mt-14">Create your account</h1>

                {/* Alert box */}
                <div className="bg-red-100 border custom-red-color-border custom-red-color-text px-3 py-2 rounded-xl mb-6">
                    <strong className="text-center block mb-1 text-base">🚧 For Employees Only</strong>
                    <p className='justify-self-center text-center text-sm w-140 pb-1'>This sign-up form is intended for Igor Drywall employees only. If you are not affiliated with Igor Drywall, please do not attempt to create an account. Unauthorized access may be removed without notice.</p>
                </div>

                {/* Form fields */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-1">First name</label>
                            <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 mb-1"/>
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1">Last name</label>
                            <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 mb-1"/>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 mb-1"/>
                    </div>


                    <div className="flex-1">
                        <label className="block mb-1">Password</label>
                        <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2"/>
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1">Confirm Password</label>
                        <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2"/>
                    </div>


                    <button type="submit" className="custom-red-color-background text-white py-3 px-20 rounded-md w-full mt-6 font-medium text-md cursor-pointer">Submit</button>

                    <p className="text-sm mt-2 text-center font-medium">Already have an account?{' '}
                        <Link to="/login" className="custom-red-color-font font-medium">Sign In</Link>
                    </p>

                </form>

            </div>

            {/* RIGHT SIDE - Image */}
            <div className="w-2/4 h-full relative">
                <img src="/register_images/truck1.jpg" alt="truck1" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

        </div>
        <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
        <SuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />
        </>
    );
}

export default Register;
