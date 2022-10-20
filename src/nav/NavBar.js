import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import "./NavBar.css"
import { FaBars, FaDrumstickBite, FaHeart, FaFish, FaSignOutAlt, FaPlus, FaStickyNote, FaEye, FaEdit } from 'react-icons/fa';
import { Modal, Button } from 'rsuite';
import { Dropdown } from 'rsuite';
import { Input } from 'rsuite';

const localAquariumUser = localStorage.getItem("Aquarium_user")
const fishUserObject = JSON.parse(localAquariumUser)

export const NavBar = () => {
    const navigate = useNavigate()
    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed')
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true)
    const [isActive, setIsActive] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const HandleAddModal = () => {

        handleOpen()

        const onSelectHandle = (e) => {
            {localStorage.setItem("Fish_Name", JSON.stringify({
                name: `${Input.value}`
            })
        )}

        const fishesArray = () => (
            fishArray.map(               
            (fish) => {
            return <Dropdown.Item 
            eventKey={fish.id}
            onSelect={onSelectHandle}
            >{fish.species}</Dropdown.Item>
          }
        )
        )

        const AddNewFish = () => {

            const [fish, setFish] = useState({
                id: "",
                userID: "",
                speciesID: "",
                name: ""
            })

            const updateFish = (evt) => {
                const copy = {...fish}
                copy[evt.target.id] = evt.target.value
                setFish(copy)
            }

            return fetch("https://waterrarium-api-yr94n.ondigitalocean.app/userFish", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fish)
            })
                .then(res => res.json())
                .then(newFish => {
                    if (newFish.hasOwnProperty("id")) {
                        const newFishID = localStorage.getItem("Fish_ID")
                        const fishIdObj = JSON.parse(newFishID)

                        const newFishName = localStorage.getItem("Fish_Name")
                        const fishNameObj = JSON.parse(newFishName)

                        localStorage.setItem("New_fish", JSON.stringify({
                            id: newFish.id,
                            userID: fishUserObject.id,
                            speciesID: fishIdObj.id,
                            name: `"${fishNameObj.id}"`
                        }))}
                    })
                    }
                

        return(
<>
        <Modal size={"xs"} keyboard={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Fish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Input size={"md"} placeholder="Name" />
            <Dropdown title="Fish" trigger="click">
                {fishesArray()}
            </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleClose} 
          {...localStorage.setItem("Fish_Name", JSON.stringify({
            name: `${Input.value}`
        }
        ))}
        appearance="primary">
            Add
          </Button>
        </Modal.Footer>
        </Modal>
        </>)
    }}

    return (
        <div className={isExpanded ? "navbar" : "navbar collapsed"}>
            <div className="navbar-header">
                <FaBars className="navbar-icon"
                onClick={handleToggler}/>
                <h4 className="navbar-logo">Waterrarium</h4>
                </div>
                <div className="navbar-items">
                    <div className="item">
                        <Link to="/home"><FaFish className="navbar-icon"/></Link>
                        <Link className="navbar-text" to="/home">Home</Link>
                    </div>
                    <div className="item">
                        <FaPlus className="navbar-icon"                
                        onClick={() => {
                    localStorage.setItem("Current_State", JSON.stringify({
                        state: "Add",
                        icon: "FaPlus"
                    }))

                    HandleAddModal()
                }
                }
                    />
                        <div className="navbar-text" onClick={() =>  HandleAddModal() }>Add Fish
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
