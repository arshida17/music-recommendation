import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword } from '../firebase/auth'
import { useAuth } from '../context/'
import '../home.css'

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                console.error("Sign-in error:", error.message);
                alert("Sign-in unsuccessful. Please check your email and password.");
            } finally {
                setIsSigningIn(false);
            }
        }
    }

    return (

        <div class="parent">
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div class="child">
                <div class="left">
                </div>
                <div class="right">
                    <form onSubmit={onSubmit}>
                        <input type="text" class="upload" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="password" class="upload" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} required />
                        <button class="upload" type="submit">
                            Login 🔓
                        </button>
                        <Link to={'/register'}>
                            Create an account?
                        </Link>

                    </form>
                </div>
            </div>
        </div>


    )
}

export default Login