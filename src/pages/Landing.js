import Navbar from '../components/NavBar'
import { useNavigate, NavLink as Link} from 'react-router-dom';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';


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
            <style>
                {`
                @keyframes rotate {
                    0% { transform: rotate(0deg); }

                    50% { transform: rotate(380deg); }

                    100% { transform: rotate(0deg); }
                }
                `}
            </style>
            <div style={{background: "linear-gradient(to bottom, black, gray)", color: 'white', minHeight: '100vh' }}>

               <div style={{ textAlign: 'center', fontSize:'10em', transform: 'rotate(380deg)',animation: 'rotate 2s linear 1' }}><FontAwesomeIcon icon={faQuestion} /></div>
                    <p style={{ textAlign: 'center', color: 'black', fontSize: '4em',  }}>
                        Guess The Price? 
                    </p>
                    <p style={{ textAlign: 'center', color: 'black', fontSize: '2em',  }}>Can you guess the price?</p>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "100%"
                    }}>

                        <button onClick={() => Navigate('/home')} style={{ width: "20%", height: '10vh', margin: '5px 0', borderRadius: '10px', backgroundColor: 'transparent', color: 'white',border: '1px solid black' }}> New Game </button>

                        <button onClick={() => Navigate('/leader-board')} style={{ width: "20%", height: '10vh', margin: '5px 0', borderRadius: '10px', backgroundColor: 'black', color: 'white',border: '1px solid black' }}>Leader Board</button>
                        <button onClick={() => Navigate('/sign-up')} style={{ width: "20%", height: '10vh', margin: '5px 0', borderRadius: '10px', backgroundColor: 'transparent', color: 'white',border: '1px solid black' }}>Sign Up</button>
                        <button onClick={() => Navigate('/settings')} style={{ width: "20%", height: '10vh', margin: '5px 0', borderRadius: '10px', backgroundColor: 'black', color: 'white',border: '1px solid black' }}>Settings</button>
                    </div>
                </div>
        
            </>
    )
}