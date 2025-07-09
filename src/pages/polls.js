
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import firebase from 'firebase/app'; // Importing firebase
import 'firebase/auth'; // Importing auth
import 'firebase/storage'; // Importing storage
import 'firebase/database'; // Importing database
import { toast, ToastContainer } from 'react-toastify'; // Importing toast
import 'react-toastify/dist/ReactToastify.css'; // Importing toast styles
import imageCompression from 'browser-image-compression'; // Importing image compression
import {  Container, Form, Button, Col, Row } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar from '../components/NavBar'
import {database} from "../config";
import {useNavigate} from "react-router-dom";
const Polls = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        highscore: 0,
    });

    const [authState, setAuthState] = useState('Logged-out');
    const [submit, setSubmit] = useState('');
    const [userUid, setUserUid] = useState('');
    const [email, setemail] = useState('');
    const [imageTwoURL, setImageTwoURL] = useState('');
    const [imageThreeURL, setImageThreeURL] = useState('');
    const [imageFourURL, setImageFourURL] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const imageConfig = {}; // Your image compression config
    const HandleSubmit = () => {
        useNavigate('/');
    };
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                setAuthState('Logged-out');
                navigate('/sign-up')
            } else {
                setAuthState('Logged-in');
                setUserUid(user.uid);
            }
        });
    }, []);


    console.log(authState)




    const fetchUserData = async () => {
        const user = firebase.auth().currentUser;
        if (user) {
            try {
                const userRef = database.ref("My-Profile").orderByChild("userUid").equalTo(user.uid);
                const snapshot = await userRef.once("value");
                const data = snapshot.val();

                if (data) {
                    if(data != ""){
                        navigate("/chart")
                    }
                    setemail(user.email)



                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    }

    fetchUserData()
    async function select( r){


        // Reference to the "My-Profile" node in the database
        const ref = database.ref("My-Profile");

        // Query to find the profile by email
        ref.orderByChild("email").equalTo(email).once("value", snapshot => {
            console.log(email)
            if (snapshot.exists()) {
                // If the profile exists, update the first matching profile
                snapshot.forEach(childSnapshot => {

                    const key = childSnapshot.key; // Get the unique key of the profile

                    // Update the profile with new data
                    ref.child(key).update({
                       rest:r
                    });
                });
            }

            setSubmit("Submitted");
        });
    };


    return(
        <div style={{ width: "100%", height: "100vh", display:"flex", alignItems:"center"}}>

            <div style={{
                margin: "auto",
                backgroundColor: "black",
                border: "100px",
                width: "50%",
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <button style={{width: "50%", backgroundColor: "white", height: "20%"}}   onClick={() => select('AZTECA')}>
                    AZTECA D'ORO
                </button>
                <button style={{marginTop:"10px",width: "50%", backgroundColor: "white", height: "20%"}} onClick={() => select('SIAM GARDEN')}>
                    SIAM GARDEN
                </button>
                <button style={{marginTop:"10px",width: "50%", backgroundColor: "white", height: "20%"}} onClick={() => select('MANGIA')}>
                    MANGIA
                </button>

            </div>

        </div>
    )


}

export default Polls;