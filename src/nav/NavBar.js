import { Link, useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import "./NavBar.css"
import { FaBars, FaDrumstickBite, FaHeart, FaFish, FaSignOutAlt, FaPlus, FaStickyNote, FaEye, FaEdit } from 'react-icons/fa';
import { Drawer } from 'rsuite';

export const NavBar = () => {
    const navigate = useNavigate()
    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed')
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true)
    const [isActive, setIsActive] = useState(false)

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
    const handleClick = () => {
        const localStateObject = localStorage.getItem("Current_State")
        const stateObject = JSON.parse(localStateObject)
        {
            if (localStorage.getItem("Current_State") === 1)
                setIsActive(current => !current);
                }
        return(
            <div style ={{
                    color: isActive ? 'salmon' : ''}}
                    onClick={handleClick}
                    {...stateObject.icon}
                    ></div>
        )
    }

    return (
        <div className={isExpanded ? "navbar" : "navbar collapsed"}>
            <div className="navbar-header">
                <FaBars className="navbar-icon"
                onClick={handleToggler}/>
                <h4 className="navbar-logo">Aquarium</h4>
                </div>
                <div className="navbar-items">
                    <div className="item">
                        <Link to="/aquarium"><FaFish className="navbar-icon"/></Link>
                        <Link className="navbar-text" to="/aquarium">My Aquarium</Link>
                    </div>
                    <div className="item">
                        <FaPlus className="navbar-icon"                
                        onClick= {() =>
                    localStorage.setItem("Current_State", JSON.stringify({
                        state: "Add",
                        icon: "FaPlus"
                    }))}/>
                        <div className="navbar-text">Add Fish
                        </div>
                        </div>
                    <div className="item">
                        <FaHeart className="navbar-icon"
                        onClick= {() =>
                    localStorage.setItem("Current_State", JSON.stringify({
                        state: "Pet",
                        icon: "FaHeart"
                    }))}/>
                        <div className="navbar-text">Pet Fish
                    </div>
                    </div>
                    <div className="item">
                        <FaDrumstickBite className="navbar-icon"
                        onClick= {() =>
                            localStorage.setItem("Current_State", JSON.stringify({
                                state: "Feed",
                                icon: "FaDrumStickBite"
                            }))}/>
                        <div className="navbar-text">Feed Fish
                        </div>
                    </div>
                    <div className="item">
                        <FaEdit className="navbar-icon"
                        onClick= {() =>
                            localStorage.setItem("Current_State", JSON.stringify({
                                state: "Edit",
                                icon: "FaEdit"
                            }))}/>
                        <div className="navbar-text">Edit/Delete Fish
                        </div>
                    </div>
                    <div className="item">
                        <FaStickyNote className="navbar-icon"/>
                        <div className="navbar-text">View Notes
                        </div>
                        </div>
                        <div className="item">
                        <FaEye className="navbar-icon"/>
                        <div className="navbar-text">View Other Aquariums
                        </div>
                        </div>
            {
                localStorage.getItem("Aquarium_user")
                    ? 
                        <div className="item">
                        <Link to="/login"><FaSignOutAlt className="navbar-icon"/></Link>
                        <Link className="navbar-text" to="/login" onClick={() => {
                            localStorage.removeItem("Aquarium_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                        </div>
                        :""
                    }
                    </div>
                    </div>
            )}
