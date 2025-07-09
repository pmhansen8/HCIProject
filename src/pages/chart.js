
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
import { Chart } from "react-google-charts";

const Charts = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        highscore: 0,
    });
 const [a, seta] = useState(0);
    const [b, setb] = useState(0);
    const [c, setc] = useState(0);
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



    async function getAllRestaurants() {
        const restArray = [];

        try {
            const ref = database.ref("My-Profile");
            const snapshot = await ref.once("value");

            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    const data = childSnapshot.val();
                    if (data.rest) {
                        restArray.push(data.rest);
                    }
                });
            }

            console.log("All restaurant values:", restArray);
               for(let i = 0; i < restArray.length; i ++){
        if (restArray[i] == 'AZTECA'){
            console.log(a)
             seta(prev => prev + 1);
        }
        if( restArray[i] == 'MANGIA'){
             setb(prev => prev + 1);
        }
        if (restArray[i] == 'SIAM GARDEN'){
             setc(prev => prev + 1);
        }

    }
  
            return restArray;
        } catch (error) {
            console.error("Error fetching rest values:", error);
            return [];
        }
    }

useEffect(() => {
    getAllRestaurants();
}, []);

    

 



     const data = [
    ["Restaurant", "count"],
    ["AZTECA", a],
    ["MANGIA", b],
    ["SIAM GARDEN", c],

  ];

  const options = {
    title: "FOOOOOD",
  };



    return(
        <div style={{width:"100%", height: "100vh"}}>

            <h1 style={{width:"100%", textAlign:"center", color:"black"}}>FOODIE QUEST</h1>
         <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"800px"}
    />
<div style={{width:"100%", textAlign:"center", color:"black", height:"800px", fontSize:"200px"}}>🍔</div>
    </div>
    )


}

export default Charts;