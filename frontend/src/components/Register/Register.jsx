import "./register.css"
import React, { useState, useContext } from "react"
import { TextField } from '@mui/material';
import shopContext from "../../context/shopContext.js";
import { toast } from "react-toastify";
import axios from "axios";
export default function Register() {
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const { backendURL, setToken, setLoginState, popupRef } = useContext(shopContext);

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                firstName,
                lastName,
                email,
                password,
            }

            let response = await axios.post(`${backendURL}/api/user/register`, payload);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }
    return (
        <>
            <div ref={popupRef} className="RegisterPopup">
                <form onSubmit={(e) => handleRegisterUser(e)} id="loginForm">
                    <div className="loginFormTextFieldContainer">
                        <TextField
                            label="First Name *"
                            variant="outlined"
                            fullWidth
                            onChange={(e)=>setFirstName(e.target.value)}
                            value={firstName}
                        />
                        <TextField
                            label="Last Name *"
                            variant="outlined"
                            fullWidth
                            onChange={(e)=>setLastName(e.target.value)}
                            value={lastName}
                        />
                    </div>
                    <TextField
                        label="Email *"
                        variant="outlined"
                        type="email"
                        placeholder="example@domain.com"
                        fullWidth
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        label="Password *"
                        variant="outlined"
                        fullWidth
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        type="password"
                    />
                    <button type="submit" className="userBtn" id="registerBtn">Register</button>
                </form>

                <div className="accountManageDiv">
                    <p>if you have already account ?</p>
                    <button onClick={()=>setLoginState("login")} className="accManageBtn">login</button>
                </div>
            </div>
        </>
    )
}