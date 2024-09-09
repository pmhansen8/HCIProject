import Navbar from '../components/NavBar'
import { useNavigate, NavLink as Link} from 'react-router-dom';
import React from "react";

export default function Landing(){


    const ToGame = () =>{
        return(
            <Navigate to="/home" />
        )
    }

    const Navigate = useNavigate()

    return(
        <>
            <Navbar/>
            <div style={{backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex' , justifyContent: 'center'}}>

                <div style={{
                    width: "80%",
                    height: '80vh',
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden', // Prevent overflow
                }}>
                    <p style={{ textAlign: 'center', color: 'black', fontSize: '4em' }}>
                        Guess The Price?
                    </p>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}>

                        <button onClick={() => Navigate('/home')} style={{ width: "50%", height: '10vh', margin: '5px 0', borderRadius: '10px' }}> New Game </button>

                        <button onClick={() => Navigate('/leader-board')} style={{ width: "50%", height: '10vh', margin: '5px 0', borderRadius: '10px' }}>Leader Board</button>
                        <button onClick={() => Navigate('/sign-up')} style={{ width: "50%", height: '10vh', margin: '5px 0', borderRadius: '10px' }}>Sign Up</button>
                        <button onClick={() => Navigate('/settings')} style={{ width: "50%", height: '10vh', margin: '5px 0', borderRadius: '10px' }}>Settings</button>
                    </div>
                </div>
            </div>
            </>
    )
}