import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("https://waterrarium-api-yr94n.ondigitalocean.app/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("Aquarium_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/login")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/users=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateuser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <><div className="ocean">
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
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Waterrarium</h1>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateuser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main></>
    )
}

