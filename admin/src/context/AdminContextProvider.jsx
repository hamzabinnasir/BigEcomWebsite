import adminContext from "./adminContext.js";
import React from "react"
export default function AdminContextProvider({ children }) {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const contextValue = {
        backendURL,
    }
    return (
        <adminContext.Provider value={contextValue}>
            {children}
        </adminContext.Provider>
    )
}