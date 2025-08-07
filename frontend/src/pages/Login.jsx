import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorToast from '../components/ErrorToast';
import SuccessToast from '../components/SuccessToast';

function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    async function handleSubmit(event){
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setErrorMessage("Please enter your email and password.");
            return;
        }

        try{
            const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "email": email,
                  "password": password
                })
            });

            const data = await response.json();

            if(response.ok){
              localStorage.setItem("token", data.token);
              localStorage.setItem("role", data.role);
              localStorage.setItem("userId", data.userId);

              setSuccessMessage(data.message)
              setTimeout(() => {
                        window.location.href = "/home";
                    }, 1000); // wait 2 seconds before redirecting

            } else {
              setErrorMessage(data.message || "An error occurred when signing in.")
            }

        } catch(error){
            setErrorMessage("An error occurred while signing in your account. Please try again later.");
            return;
        }
    }

    return (
      <>
        <div className="flex h-screen">

          {/* LEFT SIDE - Image */}
          <div className="w-2/4 h-full relative">
            <img src="/logo_images/truck2.jpg" alt="truck1" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="w-2/4 bg-white flex items-center justify-center px-16 py-12">

            <div className="w-full max-w-md">

              {/* Header */}
              <h1 className="text-center text-5xl font-semibold custom-red-color-text mb-3">Sign In</h1>
              <p className="text-center text-md font-normal mb-16">Please enter your details</p>

              {/* Form fields */}
              <form className="space-y-4" onSubmit={handleSubmit}>

                <div>
                  <input name="Email" type="text" value={email} onChange={handleEmailChange} className="w-full h-12 bg-gray-100 rounded px-3 py-2 mb-1 pl-5 placeholder:text-gray-500 placeholder:text-sm placeholder:font-medium" placeholder="Email Address" autoComplete="current-username"/>
                </div>

                <div>
                  <input name="Password" type="password" value={password} onChange={handlePasswordChange} className="w-full h-12 bg-gray-100 rounded px-3 py-2 pl-5 placeholder:text-gray-500 placeholder:text-sm placeholder:font-medium" placeholder="Password" autoComplete="current-password"/>
                </div>

                {/* Forgot Password aligned right */}
                <div className="text-right">
                    <button type="button" className="text-sm custom-red-color-font hover:underline mb-6 cursor-pointer"> 
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </button>
                </div>

                {/* Submit button */}
                <button type="submit" className="custom-red-color-background text-white py-3 px-6 rounded-md w-full mt-4 font-medium text-md cursor-pointer">Submit</button>

                {/* Footer link */}
                <p className="text-sm mt-10 text-center font-medium">Don't have an account?{' '}
                  <Link to="/register" className="custom-red-color-font font-medium hover:underline">Sign Up!</Link>
                  </p>

              </form>

            </div>

          </div>
        </div>

        <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
        <SuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />
      </>
    );
}
export default Login;