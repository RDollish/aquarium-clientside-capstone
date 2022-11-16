//please click the computer to begin
//eventlistener that when computer is clicked, bring up newuser/login screen
//new user/login banner
//if new user, navigate to character creation screen
//if returning user, navigate to books screen

import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./login.css"

export const Login = () => {
    const [email, set] = useState("r@d.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`https://waterrarium-api-yr94n.ondigitalocean.app/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("Aquarium_user", JSON.stringify({
                        id: user.id,
                        admin: user.admin
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Waterrarium</h1>
                    <h2>Please sign in.</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
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

        </main>
    )
}