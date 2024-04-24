import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../home.css'
import { doSignOut } from '../firebase/auth'
import { useAuth } from '../context'

const Header = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const { userLoggedIn } = useAuth()

    const onLogout = async (e) => {
        e.preventDefault()
        await doSignOut();
    }

    return (
        <nav>
            <div class="navleft">
                <h2>Emotion Music Recommendation</h2>
            </div>
            <div class="navright">
                <ul>
                    <li>
                        <h5>Home</h5>
                    </li>

                    {userLoggedIn && <li>
                        <h5 onClick={onLogout}>Logout</h5>
                    </li>}
                </ul>
            </div>
        </nav>
    )
}

export default Header