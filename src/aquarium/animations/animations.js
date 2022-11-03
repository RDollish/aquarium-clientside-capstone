// on page load, fish are randomly assigned a mood with a 20% probabilty. 
//if idle, change antimation to  

// from {
//     transform: rotate(0deg);
// }

// to {
//   transform: rotate(360deg);
// }
//and image url to idle.gif

//if heartbubble, normal animation, change image url to heartbubble.gif

//if hungry, follow mouse, change image url to hungry.gif

//if a fish is rehomed: sad, barely move animation, change image url to sad.gif

//if musicbubble, zippy animation, change image url to musicbubble.gif

import React, { useState, useEffect } from "react"
import "./animations.css"
import { Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useSound from 'use-sound';
import openSound from '../soundfx/huh.wav';
import Bloop from '../soundfx/Bloop.wav';



export const FishGen = () => {

    const [mood, setMood] = useState("none")
    const [love, setLove] = useState(30)
    const [sendLove, setSendLove] = useState([])
    const [action, setAction] = useState("")
    const [fishJoin, setFishJoin] = useState([])
    const [fishArray, setFishArray] = useState([])
    const [counter, setCounter] = useState(0)
    const [moodReady, setMoodReady] = useState(false)
    const [userFish, setUserFish] = useState([])
    const [userFishTrue, setFishTrue] = useState([])
    const [userClick, setUserClick] = React.useState(false)
    const [name, setName] = useState([])
    const [clicked, setClicked] = React.useState([])
    const [showEdit, setShowEdit] = React.useState(false)
    const [openEditSnackSuccess, setEditSnackSuccess] = React.useState(false);

    const localAquariumUser = localStorage.getItem("Aquarium_user")
    const fishUserObject = JSON.parse(localAquariumUser)

    const [opensound] = useSound(openSound)
    const [successbloop] = useSound(Bloop)

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setEditSnackSuccess(false);
    };


    const randomMood = () => {
        let foo = Math.random() * 100;
    
    
        if (foo < 50) // 0-49
            return 'none'
        else if (foo < 60) // 50-59
            return 'sleepy'
        else if (foo < 70) // 60-69
            return 'happy'
        else if (foo < 80) // 70-79
            return 'angry'
        else if (foo < 86) // 80-85
            return 'sad'
        else if (foo < 94) // 86-93
            return 'idle'
        else // 94-100
            return 'hungry'}


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
            
             const myFish = fishJoin.filter(fish => 
                parseInt(fish.userID) === fishUserObject.id
             )
             setUserFish(myFish)
        }
        ,[fishJoin] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (moodReady === false) {
            let mood = 'none'
                   fishArray?.forEach(fish =>
                        fish['mood'] = {mood})
                    fishArray?.map(fish => {
                        if (fish.mood)
                        setMoodReady(true)})
                        }
        }
        ,
        [fishArray, moodReady] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (moodReady === true) {
            const myFish = []
            userFish?.map(fish => {          
                let findFish = fishArray?.find(fishy => parseInt(fish.fishID) === fishy.id)
                return myFish.push(findFish)})
                    myFish?.forEach(fish =>
                        fish['mood'] = randomMood())
             setFishTrue(myFish)}
        }
        ,
        [userFish, fishArray, moodReady] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (counter === 30) {
            const myFish = []
            userFish?.map(fish => {          
                let findFish = fishArray?.find(fishy => parseInt(fish.fishID) === fishy.id)
                return myFish.push(findFish)})
                    myFish?.forEach(fish =>
                        fish['mood'] = randomMood())
             setFishTrue(myFish)
             setCounter(0)
}
        }
        ,
        [userFish, fishArray, counter] // When this array is empty, you are observing initial component state
    )

//     useEffect(
//         () => {
//             if (counter === 30) {
//             userFish?.map(fish => {
//                 setLove(fish?.love + 30) 
//                 setSendLove({love: 0})      
//                 const fetchOptions = {
//                     method: "PATCH",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(sendLove)
//                 }
            
//                 return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish/${fish.id}`, fetchOptions)})
//              setCounter(0)
// }
//         }
//         ,
//         [userFish, counter] // When this array is empty, you are observing initial component state
//     )

    useEffect(
        () => {
            if (moodReady === true) {
    const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
    }, 1000)
return () => clearInterval(interval)
        }},
        [moodReady]
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
                setEditSnackSuccess(true)
            })
        })}

        
    // const editLove = () => {
    //     const fetchOptions = {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(sendLove)
    // }

    // return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/userFish/${fish.id}`, fetchOptions)
    // }

    const onChangeCaptureHandler = (e) => {
        setName({id: clicked.id,
            name: e.target.value})
    };

    const onLoveCaptureHandler = (e) => {
        setSendLove({love: love})
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
        successbloop()
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
                    if (fish?.mood === 'none'){
                        setAction("Say Hi")
                        setMood("is doing okay today.")
                        opensound()
                    }
                    else if (fish.mood === 'happy'){
                        setMood("is in a really great mood!")
                        setAction("Pet")
                        opensound()
                    }
                    else if (fish.mood === 'sad'){
                        setMood("is feeling down today...")
                        setAction("Cheer Up")
                        opensound()
                    }
                    else if (fish.mood === 'music'){
                        setMood("is really happy you're here!")
                        setAction("Wave")
                        opensound()
                    }
                    else if (fish.mood === 'sleepy'){
                        setMood("is very sleepy.")
                        setAction("Wake Up")
                        opensound()
                    }
                    else if (fish.mood === 'idle'){
                        setMood("is feeling dizzy!")
                        setAction("Stop Spinning")
                        opensound()
                    }
                    else if (fish.mood === 'angry'){
                        setMood("is feeling grumpy today.")
                        setAction("Talk To")
                        opensound()
                    }
                    else if (fish.mood === 'hungry'){
                    setMood("is really hungry!")
                    setAction("Feed")
                    opensound()}

                      }
                      }}
                     id={fish?.name}
                     className={fish.mood}
                     key={fish?.id}> 
                     <Dialog open={showEdit} onClose={cancel}>
    <DialogTitle><TextField variant="standard"
            defaultValue={clicked.name}
            onChangeCapture={onChangeCaptureHandler}/></DialogTitle>
       <DialogContent>
            <div><center><p>
            {clicked.name} {mood}</p></center>
        </div>                       
    <Button onClick={edit}
    appearance="primary">
    Change Name
</Button>
<Button onClick={() => {
            setShowEdit(false)
            setUserClick(false)
            const findMood = fishArray?.find(fishy => parseInt(clicked.fishID) === fishy.id)
            findMood['mood'] = "music"
}}
    appearance="primary">
    {action}
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
                    </article>
                    <Snackbar
                            open={openEditSnackSuccess}
                            autoHideDuration={6000}
                            onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Fish Successfully Renamed!
                            </Alert>
                        </Snackbar>       </>
}
