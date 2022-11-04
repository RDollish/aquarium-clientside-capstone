import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import "./shop.css"
import { FaBars, FaFish, FaSignOutAlt, FaPlus, FaDollarSign } from 'react-icons/fa';
import { Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useSound from 'use-sound';
import Bloop from '../soundfx/Bloop.wav';
import Blop from '../soundfx/Blop.wav';


export const Shop = () => {
    const navigate = useNavigate()
    const [fishArray, setFishArray] = useState([])
    const [userFishArray, setuserFishArray] = useState([])
    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed')
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true)
    const [fish, setFish] = useState()
    const [name, setName] = useState()
    const [species, setSpecies] = useState()
    const [deleted, setDeleted] = useState()
    const [openAddSnackSuccess, setAddSnackSuccess] = React.useState(false);
    const [openAddSnackFail, setAddSnackFail] = React.useState(false);
    const [openDeleteSnackSuccess, setDeleteSnackSuccess] = React.useState(false);
    const [openDeleteSnackFail, setDeleteSnackFail] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const [loadingAddModal, setLoadingAddModal] = useState(false)
    const [loadingDeleteModal, setLoadingDeleteModal] = useState(false)


    const localAquariumUser = localStorage.getItem("Aquarium_user")
    const fishUserObject = JSON.parse(localAquariumUser)
    const [successbloop] = useSound(Bloop)
    const [failbloop] = useSound(Blop)

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAddSnackSuccess(false);
        setDeleteSnackSuccess(false)
        setAddSnackFail(false)
        setDeleteSnackFail(false)
    };

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
        setSpecies()
        setName()
        setDeleted()

    }

    const add = () => {
        setShowAdd(false);
        const localAquariumUser = localStorage.getItem("Aquarium_user")
        const fishUserObject = JSON.parse(localAquariumUser)
    if (species && name) {
        setFish({
            userID: fishUserObject.id,
            fishID: parseInt(species),
            name: name,
            love: 0
        },
            setLoading(true))
            setName()
            setSpecies()
        successbloop()}
            
            else{
                setAddSnackFail(true)
                setName()
                setSpecies()
                failbloop()
            }
    }

    // Function to close Modal
    const openAdd = () => {
        setShowDelete(false);
        setLoadingAddModal(true);
    }

    const openDelete = () => {
        setShowAdd(false);
        setLoadingDeleteModal(true);
    }

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
                .then(() => {
                    return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish`)
                        .then(response => response.json())
                        .then((userFishArray) => {
                            setuserFishArray(userFishArray)
                        })
                })
        }
        newFish()
        setAddSnackSuccess(true)
        setLoading(false)
        fishesArray()
    }

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


    const fishesArray = () => (
        fishArray.map(
            (fish) => {
                const owned = userFishArray.filter(fish => fish.userID === fishUserObject.id)
                if (owned.find(fishie => parseInt(fishie.fishID) === fish.id)){
                    return <MenuItem value={fish.id} key={fish.id} disabled
                    onChangeCapture={onChangeFishHandler}>{fish.species} (owned)</MenuItem>
                }
                else{
                return (
                    <MenuItem value={fish.id} key={fish.id}
                        onChangeCapture={onChangeFishHandler}>{fish.species}</MenuItem>

                )
            }}
        )
    )

    const userfishesArray = () => (
        userFishArray.filter(fish => fish.userID === fishUserObject.id).map(filteredFish => {
            return (
                <MenuItem key={filteredFish.id} value={filteredFish.id}
                    onChangeCapture={onChangeFishDeleter}>{filteredFish.name}</MenuItem>

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
        if (deleted) {
        return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish/${deleted}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then(() => {
            return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish`)
                .then(response => response.json())
                .then((userFishArray) => {
                    setDeleted()
                    setuserFishArray(userFishArray)
                    setDeleteSnackSuccess(true)
                    failbloop()
                })
        })}
        else{
            setDeleteSnackFail(true)
            failbloop()
        }

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
                                label="Name"
                                multiline
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                                onChangeCapture={onChangeCaptureHandler} />
                                <div>
                                    <FormControl sx={{ m: 1, minWidth: 160 }}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Add</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            onChange={onChangeFishHandler}
                                            autoWidth
                                            label="Add"
                                        >
                                            {fishesArray()}
                                        </Select></FormControl>
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
                        <Snackbar
                            open={openAddSnackSuccess}
                            autoHideDuration={6000}
                            onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Fish Successfully Added!
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            open={openAddSnackFail}
                            autoHideDuration={6000}
                            onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                Could not add, missing name or species.
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            open={openDeleteSnackFail}
                            autoHideDuration={6000}
                            onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                Did not select a fish.
                            </Alert>
                        </Snackbar>
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
                                <FormControl sx={{ m: 1, minWidth: 130 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Select</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        onChange={onChangeFishDeleter}
                                        autoWidth
                                        label="Delete"
                                    >
                                        {userfishesArray()}
                                    </Select></FormControl>
                                <p></p><Button onClick={remove}
                                >
                                    Rehome
                                </Button>
                                <Button onClick={cancel}
                                >
                                    Cancel
                                </Button>
                            </DialogContent>
                        </Dialog>
                        <Snackbar
                            open={openDeleteSnackSuccess}
                            autoHideDuration={6000}
                            onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Fish Successfully Rehomed!
                            </Alert>
                        </Snackbar>
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
                            )
                        })
                }
            </article></div></React.Fragment>
}
