import "./sidebar.css"
import React from "react"
import { NavLink } from "react-router-dom"
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AddBoxIcon from '@mui/icons-material/AddBox';
export default function Sidebar() {
    return (
        <>
            <div className="adminSidebar">
                <NavLink className="navlink" to={"/dashboard"}>
                    <div className="sidebarList">
                        <DashboardIcon />
                        <p>Dashboard</p>
                    </div>
                </NavLink>
                <NavLink className="navlink" to={"/products"}>
                    <div className="sidebarList">
                        <Inventory2Icon />
                        <p>Products</p>
                    </div>
                </NavLink>
                <NavLink className="navlink" to={"/customers"}>
                    <div className="sidebarList">
                        <PeopleIcon />
                        <p>Customers</p>
                    </div>
                </NavLink>
                <NavLink className="navlink" to={"/orders"}>
                    <div className="sidebarList">
                        <ShoppingCartIcon />
                        <p>Orders</p>
                    </div>
                </NavLink>
                <NavLink className="navlink" to={"/totalEarnings"}>
                    <div className="sidebarList">
                        <AttachMoneyIcon />
                        <p>Total Earnings</p>
                    </div>
                </NavLink>
                <NavLink className="navlink" to={"/weeklyOverview"}>
                    <div className="sidebarList">
                        <BarChartIcon />
                        <p>Weekly Overview</p>
                    </div>
                </NavLink>
                <NavLink className="navlink" to={"/monthlyOverview"}>
                    <div className="sidebarList">
                        <ShowChartIcon />
                        <p>Monthly Overview</p>
                    </div>
                </NavLink>
                <NavLink className="navlink" to={"/addProduct"}>
                <div className="sidebarList">
                    <AddBoxIcon />
                    <p>Add Products</p>
                </div>
                </NavLink>
            </div>
        </>
    )
}