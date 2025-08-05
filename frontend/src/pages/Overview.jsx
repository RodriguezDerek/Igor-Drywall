import React from "react";
import { useState, useEffect } from "react";
import { isTokenExpired, getUserId } from "../util/auth";

function Overview(){

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token || isTokenExpired(token)){
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            window.location.href = "/home";
        }
    }, []);

    return(
        <>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-700">Welcome to your dashboard!</p>
            </div>   
        </>
    );
}
export default Overview