import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import "./shop.css"
import { FaBars, FaFish, FaSignOutAlt, FaPlus, FaDollarSign } from 'react-icons/fa';
import { Dialog, DialogTitle, DialogContent, Button, TextField} from '@mui/material';



export const Shop = () => {
    const navigate = useNavigate()
    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed')
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true)
    const [fish, setFish] = useState()
    const [name, setName] = useState()
    const [species, setSpecies] = useState()
    const [deleted, setDeleted] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingAddModal, setLoadingAddModal] = useState(false)
    const [loadingDeleteModal, setLoadingDeleteModal] = useState(false)

    useEffect(
        () => {
            if (loading === true)
            RegisterNewFish()
            },
        [loading] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (loadingAddModal === true)
            setShowAdd(true);
            setLoadingAddModal(false)
            },
        [loadingAddModal] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (loadingDeleteModal === true)
            setShowDelete(true);
            setLoadingDeleteModal(false)
            },
        [loadingDeleteModal] // When this array is empty, you are observing initial component state
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

    const [showAdd, setShowAdd] = React.useState(false)
    const [showDelete, setShowDelete] = React.useState(false)

    // Function to open Modal
    const cancel = () => {
        setShowAdd(false);
        setShowDelete(false);
        
    }

    const add = () => {
        setShowAdd(false);
        const localAquariumUser = localStorage.getItem("Aquarium_user")
        const fishUserObject = JSON.parse(localAquariumUser)
    
        setFish({userID: fishUserObject.id,
            fishID: species,
            name: name},
            setLoading(true))
        }

    // Function to close Modal
    const openAdd = () => {
        setShowDelete(false);
        setLoadingAddModal(true);}

    const openDelete = () => {
        setShowAdd(false);
        setLoadingDeleteModal(true);}
    

 const RegisterNewFish = () => {


        const newFish = () => {
            return fetch("https://waterrarium-api-yr94n.ondigitalocean.app/userFish", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fish)
            })
            .then(response => response.json())
            .then(() => { return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish`)
            .then(response => response.json())
            .then((userFishArray) => {
                setuserFishArray(userFishArray)
                })})
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

    const [userFishArray, setuserFishArray] = useState([])
    useEffect(
        () => {
            fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish`)
                .then(response => response.json())
                .then((userFishArray) => {
                    setuserFishArray(userFishArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    const localAquariumUser = localStorage.getItem("Aquarium_user")
    const fishUserObject = JSON.parse(localAquariumUser)

    const fishesArray = () => (
        fishArray.map(
            (fish) => {
                return (
                
                <React.Fragment><input type="radio" value={fish.id} key={fish.id} name='fishnames'
                onChangeCapture={onChangeFishHandler}/> {fish.species}</React.Fragment>

                )
            }
        )
    )
    
    const userfishesArray = () => (
        userFishArray.filter(fish => fish.userID === fishUserObject.id).map(filteredFish => {
               return (
                <React.Fragment><input type="radio" key={filteredFish.id} value={filteredFish.id} name="fishnames"
                onChangeCapture={onChangeFishDeleter}
                /> {filteredFish.name}</React.Fragment>

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

    const onChangeFishDeleter = (e) => {
        setDeleted(e.target.value)
    };



    const remove = () => {
        setShowDelete(false);
        return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish/${deleted}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
            }
    ).then(() => { return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish`)
    .then(response => response.json())
    .then((userFishArray) => {
        setuserFishArray(userFishArray)})})
        
}



    return <React.Fragment>
    <div className="shop">
        <div className={isExpanded ? "navbar" : "navbar collapsed"}>
            <div className="navbar-header">
                <FaBars className="navbar-icon"
                    onClick={handleToggler} />
                <h4 className="navbar-logo">Waterrarium</h4>
            </div>
            <div className="navbar-items">
                <div className="item">
                    <Link to="/"><FaFish className="navbar-icon" /></Link>
                    <Link className="navbar-text" to="/">Home</Link>
                </div>
                <div className="item">
                    <FaPlus className="navbar-icon"
                        onClick={openAdd}
                    />
                    <Dialog open={showAdd} onClose={cancel}>
                        <DialogTitle><center>Add Fish</center></DialogTitle>
                            <DialogContent><TextField variant="standard"
                                label="Required"
                                defaultValue="Fish Name"
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                                onChangeCapture={onChangeCaptureHandler}/>
                                <div>
                                {fishesArray()}
                            </div>
                            <Button onClick={add}
                                appearance="primary">
                                Add
                            </Button>
                            <Button onClick={cancel} 
                            appearance="subtle">
                                
                                Cancel
                            </Button>
                        </DialogContent>
                    </Dialog>
                    <div className="navbar-text" onClick={openAdd}>Add Fish
                    </div>
                </div>
                <div className="item">
                    <FaDollarSign className="navbar-icon"
                        onClick={openDelete} /><div className="navbar-text" onClick={openDelete} >Rehome Fish
                        </div>
                        <Dialog open={showDelete} onClose={cancel}>
                        <DialogTitle><center>Rehome Fish</center></DialogTitle>
                        <DialogContent>
                                <div>
                                {userfishesArray()}
                            </div>
                            <Button onClick={remove}
                              >
                                Rehome
                            </Button>
                            <Button onClick={cancel} 
                          >
                                
                                Cancel
                            </Button>
                            </DialogContent>
                    </Dialog>
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
         <div className="ocean">
         <div className="bubble bubble--1"></div>
         <div className="bubble bubble--2"></div>
         <div className="bubble bubble--3"></div>
         <div className="bubble bubble--4"></div>
         <div className="bubble bubble--5"></div>
         <div className="bubble bubble--6"></div>
         <div className="bubble bubble--7"></div>
         <div className="bubble bubble--8"></div>
         <div className="bubble bubble--9"></div>
         <div className="bubble bubble--10"></div>
         <div className="bubble bubble--11"></div>
         <div className="bubble bubble--12"></div>
       </div>
           <article className="fish">
               {
                   fishArray?.map(
                       (fish) => {
                           return (
                                 <div
                                className="fish"
                                key={fish?.id}
                                id={fish?.name}> 
                               </div>
                   )})
}
                               </article></div></React.Fragment>
            }
