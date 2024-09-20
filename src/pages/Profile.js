import React, { useState, useEffect } from 'react';
import Navbar from "../components/NavBar";
import { database } from '../config';
import { Container, Card } from 'react-bootstrap';
import firebase from 'firebase';

export default function Profile() {
    const [userData, setUserData] = useState({
        email: '',
        highscore: 0,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const user = firebase.auth().currentUser;
            if (user) {
                try {
                    const userRef = database.ref("My-Profile").orderByChild("userUid").equalTo(user.uid);
                    const snapshot = await userRef.once("value");
                    const data = snapshot.val();

                    if (data) {
                        const userKey = Object.keys(data)[0];
                        const userInfo = data[userKey];

                        setUserData({
                            email: user.email,
                            highscore: userInfo.highscore || 0,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <div style={{ background: "linear-gradient(to bottom, black, gray)", color: 'white', minHeight: '100vh' }}>
            <Navbar />
            <Container style={{ padding: '2rem' }}>
                <Card style={{ backgroundColor: 'black', color: 'white', border: '1px solid white' }}>
                    <Card.Body>
                        <Card.Title className="text-center">Profile</Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {userData.email}
                        </Card.Text>
                        <Card.Text>
                            <strong>Highscore:</strong> {userData.highscore}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
