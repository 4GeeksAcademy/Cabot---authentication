import React, { useContext, useState } from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"


export const Login = () => {
    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate() //This is how you would reroute buttons and links to go where you want it to go
    const handleSubmit = async() => {
        let success = await actions.login(email, password)
        if (success) {
            navigate("/private")
        }
        else{
            alert("unsuccessful login, idiot.")
        }
    }
    return (
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input 
                    type="email" 
                    class="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    minLength={10}
                    />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    id="exampleInputPassword1"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={5}
                    />
            </div>
            <button type="submit" class="btn btn-primary" onClick= {(e) => {
                 e.preventDefault() //this is when I want to submit a form but do NOT want it to refresh
                handleSubmit();
                }}>Submit</button>
        </form>
    )
}
// call handle submit on submit of the form. create a property called onSubmit and call handleSubmit in that.
// add value property to the email and password
// onChange 

// duplicate/change for signup
// on private you call on the function to go private IF password and email are correct. "in order to see this message you need to be logged in"



