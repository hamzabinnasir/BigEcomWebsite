import "./navbar.css"
import shopContext from "../../context/shopContext.js"
import React, { useState, useEffect, useContext } from "react"
import assets from "../../assets/assetsFile.js"
import { womenData, navListData, menData, companyData, storesData, navBottomListData } from "./navContent.js"
import { useNavigate } from "react-router-dom"
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
export default function Navbar() {
    const [navState, setNavState] = useState("");
    const [navData, setNavData] = useState([]);
    const [navBottomData, setNavBottomData] = useState([]);
    const [navOpen, setNavOpen] = useState(false);
    const [navMenu, setNavMenu] = useState(false);
    const { cartQuantity, profileData, token, setLoginPopup, setToken } = useContext(shopContext);
    useEffect(() => {
        switch (navState) {
            case "women":
                setNavData(womenData);
                setNavBottomData(navBottomListData.filter((item) => item.topLevelCategory === navState));
                setNavOpen(true);
                break;
            case "men":
                setNavData(menData);
                setNavBottomData(navBottomListData.filter((item) => item.topLevelCategory === navState));
                setNavOpen(true);
                break;
            case "company":
                setNavData(companyData);
                setNavBottomData(navBottomListData.filter((item) => item.topLevelCategory === navState));
                setNavOpen(true);
                break;
            case "stores":
                setNavData(storesData);
                setNavBottomData(navBottomListData.filter((item) => item.category === navState));
                setNavOpen(true);
                break;
            default:
                setNavOpen(false);
                break;
        }
    }, [navState]);

    const navigate = useNavigate();
    const navDataHandler = (topLevelCategory, secondLevelCategory, thirdLevelCategory) => {
        setNavOpen(false);
        navigate(`/productCategory/${topLevelCategory}/${secondLevelCategory}/${thirdLevelCategory}`);
    }

    const handleNavigate = (page) => {
        switch (page) {
            case "profile":
                setNavMenu(false);
                navigate("/");
                break;
            case "filterOrders":
                setNavMenu(false);
                navigate("/filterOrders");
                break;
            default:
                break;
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        setNavMenu(false);
        navigate("/");
    }
    return (
        <>
            <nav id="navbar">
                <div className="navTop">
                    <ul>
                        <img src={assets.logo} alt="no img" />
                        {
                            navListData.map((item) =>
                                <li onClick={() => setNavState(item.title)} key={item._id} className={navState === item.title ? "navListItem underLine" : "navListItem"}>{item.title}</li>
                            )
                        }
                    </ul>

                    <div className="navProfileSection">
                        <div className="navMenuContainer">
                            {
                                token === "" ? (
                                    <button onClick={() => setLoginPopup(true)} className="navSignInBtn">Sign in</button>
                                )
                                    :
                                    (
                                        profileData?.profilePic === "" ?
                                            <div onClick={() => setNavMenu(true)} className="NavprofilePic">
                                                <p>{profileData?.username?.charAt(0).toUpperCase()}</p>
                                            </div>
                                            :
                                            <div onClick={() => setNavMenu(true)} className="profilePicImgDiv">
                                                <img src={profileData?.profilePic} alt="no img" />
                                            </div>
                                    )
                            }

                            {
                                navMenu === true ?
                                    <div className="navMenuBox">
                                        <p onClick={() => handleNavigate("profile")} className="menuBoxListItem">Profile</p>
                                        <p onClick={() => handleNavigate("filterOrders")} className="menuBoxListItem">My Orders</p>
                                        <p onClick={() => handleLogout()} className="menuBoxListItem">Logout</p>
                                    </div>
                                    :
                                    ""
                            }
                        </div>
                        <img src={assets.searchLine} alt="no img" />

                        <div onClick={() => navigate("/cart")} className="anvCartDiv">
                            <ShoppingBagOutlinedIcon />
                            <p className="navCartQuantityPara">{cartQuantity}</p>
                        </div>
                    </div>
                </div>


                {/* Navbar Bottom */}
                <div className="navBottom">
                    {
                        navOpen ?
                            <>
                                <div className="navBottomListContainer">
                                    {
                                        navBottomData.map((item) =>
                                            item.listItemsContainer.map((ulItems) =>
                                                <ul key={ulItems._id}>
                                                    <h4>{ulItems.secondLevelCategory}</h4>
                                                    {
                                                        ulItems.listItems.map((listItem, index) =>
                                                            <li onClick={() => navDataHandler(item.topLevelCategory, ulItems.secondLevelCategory, ulItems.values[index])} key={index}>{listItem}</li>
                                                        )
                                                    }
                                                </ul>
                                            )
                                        )
                                    }
                                </div>

                                <div className="navBottomImgBoxes">
                                    {
                                        navData.map((item) =>
                                            <div key={item._id} className="navBottomImgBox">
                                                <img src={item.img} alt="no img" />
                                                <h3>{item.title}</h3>
                                                <button id="shopNow">Shop now</button>
                                            </div>
                                        )
                                    }
                                </div>
                            </> :
                            ""
                    }
                </div>
            </nav>
        </>
    )
}