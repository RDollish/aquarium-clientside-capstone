import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import "./NavBar.css"
import { FaBars, FaDrumstickBite, FaHeart, FaFish, FaSignOutAlt, FaPlus, FaStickyNote, FaEye, FaEdit } from 'react-icons/fa';
import { Modal, Button } from 'rsuite';
import { Input } from 'rsuite';
import { Menu, MenuItem, MenuButton, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';



export const NavBar = () => {
    const navigate = useNavigate()
    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed')
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true)
    const [isActive, setIsActive] = useState(false)
    const [fish, setFish] = useState()
    const [name, setName] = useState()
    const [species, setSpecies] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(
        () => {
            if (loading === true)
            RegisterNewFish()
            },
        [loading] // When this array is empty, you are observing initial component state
    )


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
        return (
            <div style={{
                color: isActive ? 'salmon' : ''
            }}
                onClick={handleClick}
                {...stateObject.icon}
            ></div>
        )
    }

    const [show, setShow] = React.useState(false)

    // Function to open Modal
    const cancel = () => {
        setShow(false);
        
    }

    const add = () => {
        setShow(false);
        const localAquariumUser = localStorage.getItem("Aquarium_user")
        const fishUserObject = JSON.parse(localAquariumUser)
    
        setFish({userID: fishUserObject.id,
            fishID: species,
            name: name},
            setLoading(true))
        }

    // Function to close Modal
    const open = () => {
        setShow(true);
    }

 const RegisterNewFish = (props) => {


        const newFish = () => {
            return fetch("https://waterrarium-api-yr94n.ondigitalocean.app/userFish", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fish)
            })
        }
        newFish()
        setLoading(false)
    }

    const [fishArray, setFishArray] = useState([])
    useEffect(
        () => {
            fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/fish`)
                .then(response => response.json())
                .then((fishArray) => {
                    setFishArray(fishArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )


    const fishesArray = () => (
        fishArray.map(
            (fish) => {
                return (
                
                <><input type="radio" value={fish.id} name='fishnames'
                onChangeCapture={onChangeFishHandler}/> {fish.species}</>

                )
            }
        )
    )

    
    const onChangeCaptureHandler = (e) => {
        setName(e.target.value)
    };

    const onChangeFishHandler = (e) => {
        setSpecies(e.target.value)
    };



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
                    <FaPlus className="navbar-icon"
                        onClick={open}
                    />
                    <Modal size='xs' backdrop={true} open={show} onClose={cancel}>
                        <Modal.Header>
                            <Modal.Title>Add Fish</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Input size={"md"}
                                placeholder="Fish Name"
                                onChangeCapture={onChangeCaptureHandler}/>
                                <div>
                                {fishesArray()}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={add}
                                appearance="primary">
                                Add
                            </Button>
                            <Button onClick={cancel} 
                            appearance="subtle">
                                
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="navbar-text" onClick={open}>Add Fish
                    </div>
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
                    <FaEdit className="navbar-icon"
                        onClick={() =>
                            localStorage.setItem("Current_State", JSON.stringify({
                                state: "Edit",
                                icon: "FaEdit"
                            }))} />
                    <div className="navbar-text">Edit/Delete Fish
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
