import React, { useEffect, useState } from "react"
import "./Aquarium.css"
import { Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';


export const FishList = () => {
    const [fishJoin, setFishJoin] = useState([])
    const [fishArray, setFishArray] = useState([])
    const [userFish, setUserFish] = useState([])
    const [userFishTrue, setFishTrue] = useState([])
    const [userClick, setUserClick] = React.useState(false)
    const [name, setName] = useState([])
    const [clicked, setClicked] = React.useState([])
    const [showEdit, setShowEdit] = React.useState(false)

    const localAquariumUser = localStorage.getItem("Aquarium_user")
    const fishUserObject = JSON.parse(localAquariumUser)

    useEffect(
        () => {
            fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish`)
            .then(response => response.json())
            .then((fishArray) => {
                setFishJoin(fishArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    
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
             const myFish = fishJoin.filter(fish => parseInt(fish.userID) === fishUserObject.id)
             setUserFish(myFish)
        }
        ,
        [fishJoin] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            const myFish = []
            userFish?.map(fish => {             
                let findFish = fishArray?.find(fishy => parseInt(fish.fishID) === fishy.id)
                return myFish.push(findFish)})

             setFishTrue(myFish)
        }
        ,
        [userFish, fishArray] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (userClick === true){
            setShowEdit(true)
                 
        }}
        ,
        [userClick] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (userClick === false){
            setShowEdit(false)
                 
        }}
        ,
        [userClick] // When this array is empty, you are observing initial component state
    )


    useEffect(
        () => {
            if (showEdit === false){
            setUserClick(false)
                 
        }}
        ,
        [showEdit] // When this array is empty, you are observing initial component state
    )

    

    const editName = () => {
                const fetchOptions = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(name)
            }
            return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish/${name.id}`, fetchOptions)
            .then(response => response.json())
            .then(() => { return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish`)
            .then(response => response.json())
            .then((fishArray) => {
                setFishJoin(fishArray)
            })
        })}


    const onChangeCaptureHandler = (e) => {
        setName({id: clicked.id,
            name: e.target.value})
    };

    const cancel = () => {
        setShowEdit(false)
        setUserClick(false)
        setClicked([])
        
    }

    const edit = () => {
        setShowEdit(false)
        setUserClick(false)
        editName()
        }



    return <>

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
            userFishTrue?.map(
                (fish) => {
                    return <section className="fish"
                    key={fish?.id}>
                          <div onClick={() => {
                        setUserClick(true)
                        if (showEdit === false) {
                        const matchFishie = userFish.find(
                            (fishie) => {
                               return parseInt(fishie.fishID) === fish.id})
                        setClicked(matchFishie)
                          }
                          }}
                         id={fish?.name}
                         key={fish?.id}>  
                         <Dialog open={showEdit} onClose={cancel}>
        <DialogTitle><center>Edit Name: {clicked.name}</center></DialogTitle>
           <DialogContent>
            <TextField variant="standard"
                label="Required"
                defaultValue={clicked.name}
                onChangeCapture={onChangeCaptureHandler}/>
                <div>
            </div>                        
        <Button onClick={edit}
        appearance="primary">
        Change
    </Button>
    <Button onClick={cancel} 
    appearance="subtle">
        Close
    </Button>
    </DialogContent>
</Dialog>                          
                        </div>
                        </section>
                        })
}
                    </article></>
    }
