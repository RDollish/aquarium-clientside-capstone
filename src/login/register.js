import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        admin: false
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
                        id: createdUser.id,
                        admin: createdUser.admin
                    }))

                    navigate("/")
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
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for 404 Aquarium</h1>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateuser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isStaff = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="email"> I am an employee </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

