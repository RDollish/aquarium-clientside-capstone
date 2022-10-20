import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Aquarium.css"

export const FishList = () => {
    const [fishJoin, setFishJoin] = useState([])
    const [fishArray, setFishArray] = useState([])
    const [userFish, setUserFish] = useState([])
    const [userFishTrue, setFishTrue] = useState([])
    const [userClick, setUserClick] = useState([false])
    const navigate = useNavigate()

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
             const myFish = fishJoin.filter(fish => fish.userID == fishUserObject.id)
             setUserFish(myFish)
        }
        ,
        [fishJoin] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            const myFish = []
            userFish?.map(fish => {             
                let findFish = fishArray?.find(fishy => fish.speciesID == fishy.id)
                myFish.push(findFish)})

             setFishTrue(myFish)
        }
        ,
        [userFish, fishArray] // When this array is empty, you are observing initial component state
    )

    return <>

  <div class="ocean">
  <div class="bubble bubble--1"></div>
  <div class="bubble bubble--2"></div>
  <div class="bubble bubble--3"></div>
  <div class="bubble bubble--4"></div>
  <div class="bubble bubble--5"></div>
  <div class="bubble bubble--6"></div>
  <div class="bubble bubble--7"></div>
  <div class="bubble bubble--8"></div>
  <div class="bubble bubble--9"></div>
  <div class="bubble bubble--10"></div>
  <div class="bubble bubble--11"></div>
  <div class="bubble bubble--12"></div>
</div>

    <article className="fish">
        {
            userFishTrue?.map(
                (fish) => {
                    return <section className="fish">
                          <div onClick={() => 
                          {setUserClick(true)
                            const matchFishie = userFish?.find(
                            (fishie) => {
                               return fishie.speciesID == fish.id
                                    
                                })
                                alert(`${matchFishie.name} says hello!`)
                                }}
                         id={fish?.name}></div>
                        </section>
                        })}
    </article></>
    }
