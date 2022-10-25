import { Link, useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import "./NavBar.css"
import { FaBars, FaDrumstickBite, FaHeart, FaFish, FaSignOutAlt, FaStickyNote, FaEye, FaCashRegister } from 'react-icons/fa';




export const NavBar = () => {
    const navigate = useNavigate()
    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed')
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true)

    const handleToggler = () => {

        if (isExpanded) {
            setIsExpanded(false)
            localStorage.setItem('sidebar-collapsed', true)
            return
        }
        setIsExpanded(true)
        localStorage.removeItem('sidebar-collapsed')
        return
    }

    return (
        <div className={isExpanded ? "navbar" : "navbar collapsed"}>
            <div className="navbar-header">
                <FaBars className="navbar-icon"
                    onClick={handleToggler} />
                <h4 className="navbar-logo">Waterrarium</h4>
            </div>
            <div className="navbar-items">
                <div className="item">
                    <Link to="/home"><FaFish className="navbar-icon" /></Link>
                    <Link className="navbar-text" to="/home">Home</Link>
                </div>
                <div className="item">
                <Link to="/shop"><FaCashRegister className="navbar-icon"/></Link>
                <Link className="navbar-text" to="/shop">Shop</Link>
                </div>
                <div className="item">
                    <FaHeart className="navbar-icon"
                        onClick={() =>
                            localStorage.setItem("Current_State", JSON.stringify({
                                state: "Pet",
                                icon: "FaHeart"
                            }))} />
                    <div className="navbar-text">Pet Fish
                    </div>
                </div>
                <div className="item">
                    <FaDrumstickBite className="navbar-icon"
                        onClick={() =>
                            localStorage.setItem("Current_State", JSON.stringify({
                                state: "Feed",
                                icon: "FaDrumStickBite"
                            }))} />
                    <div className="navbar-text">Feed Fish
                    </div>
                </div>
                <div className="item">
                    <FaStickyNote className="navbar-icon" />
                    <div className="navbar-text">View Notes
                    </div>
                </div>
                <div className="item">
                    <FaEye className="navbar-icon" />
                    <div className="navbar-text">View Other Aquariums
                    </div>
                </div>
                {
                    localStorage.getItem("Aquarium_user")
                        ?
                        <div className="item">
                            <Link to="/login"><FaSignOutAlt className="navbar-icon" /></Link>
                            <Link className="navbar-text" to="/login" onClick={() => {
                                localStorage.removeItem("Aquarium_user")
                                navigate("/", { replace: true })
                            }}>Logout</Link>
                        </div>
                        : ""
                }
            </div>
        </div>
    )
            }
