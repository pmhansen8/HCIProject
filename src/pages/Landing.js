import Navbar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

export default function Landing() {
    const navigate = useNavigate();

    const buttonStyle = {
        height: '10vh',
        margin: '5px 0',
        borderRadius: '10px',
        border: '1px solid black',
        backgroundColor: 'transparent', 
        color: 'white' 
    };

    return (
        <>
            <Navbar />
            <style>
                {`
                @keyframes rotate {
                    0% { transform: rotate(0deg); }
                    50% { transform: rotate(380deg); }
                    100% { transform: rotate(0deg); }
                }

                .button-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items: center;
                    width: 100%;
                }
                      .button-container button {
                  
                    width: 20%;
                }

                
                @media (max-width: 768px) {
                    .button-container {
                        flex-direction: column;
                        align-items: center; 
                    }

                    .button-container button {
                        width: 75%; 
                    }
                }
                `}
            </style>

            <div style={{ background: "linear-gradient(to bottom, black, gray)", color: 'white', minHeight: '100vh', overflow: 'hidden', paddingBottom: "3%" }}>
                
                <div style={{
                    textAlign: 'center',
                    fontSize: '10em',
                    transform: 'rotate(380deg)',
                    animation: 'rotate 2s linear 1',
                    transformOrigin: 'center'
                }}>
                    <FontAwesomeIcon icon={faQuestion} />
                </div>

                
                <p style={{ textAlign: 'center', color: 'black', fontSize: '4em' }}>
                    Guess The Price?
                </p>
                <p style={{ textAlign: 'center', color: 'black', fontSize: '2em' }}>Can you guess the price?</p>

              
                <div className="button-container">
                    <button
                        onClick={() => navigate('/home')}
                        style={{ ...buttonStyle }}
                    >
                        New Game
                    </button>

                    <button
                        onClick={() => navigate('/leader-board')}
                        style={{ ...buttonStyle, backgroundColor: 'black', color: 'white' }}
                    >
                        Leader Board
                    </button>

                    <button
                        onClick={() => navigate('/sign-up')}
                        style={{ ...buttonStyle }}
                    >
                        Sign Up
                    </button>

                    <button
                        onClick={() => navigate('/settings')}
                        style={{ ...buttonStyle, backgroundColor: 'black', color: 'white' }}
                    >
                        Settings
                    </button>
                </div>
            </div>
        </>
    );
}
