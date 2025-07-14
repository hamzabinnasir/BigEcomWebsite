import "./navbar.css"
import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import assets from "../../assets/assetsFile"
export default function Navbar() {
    return (
        <>
            <nav id="adminNavbar">
                <div className="searchAndLogo">
                    <img src={assets.logo} alt="no img" />
                    <div className="searchField">
                        <SearchIcon />
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>

                <div className="navbarProfileSec">
                    <div className="iconCircle notifyIconDiv">
                        <span className="navCircle">4</span>
                        <EmailIcon />
                    </div>
                    <div className="iconCircle notifyIconDiv">
                        <span className="navCircle">11</span>
                        <NotificationsIcon />
                    </div>
                    <div className="iconCircle notifyIconDiv">
                        <AccountCircleIcon />
                    </div>
                </div>
            </nav>
        </>
    )
}