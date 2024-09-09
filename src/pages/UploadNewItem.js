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

const NewItem = () => {
    const [authState, setAuthState] = useState('Logged-out');
    const [submit, setSubmit] = useState('');
    const [userUid, setUserUid] = useState('');
    const [imageOneURL, setImageOneURL] = useState('');
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
            } else {
                setAuthState('Logged-in');
                setUserUid(user.uid);
            }
        });
    }, []);

    const handleImageChange = async (e, imageNumber) => {
        const imageFile = e.target.files[0];
        if (!imageFile) return;

        try {
            const compressedFile = await imageCompression(imageFile, imageConfig);

            const uploadTask = firebase.storage().ref(`images/${compressedFile.name}`).put(compressedFile);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    toast(`Image ${imageNumber} is Uploading: Please Wait`, { type: 'warning', toastId: `${imageNumber}` });
                    if (progress === 100) {
                        toast.update(`${imageNumber}`, {
                            render: `Image ${imageNumber} Upload Done`,
                            type: 'success',
                            autoClose: 5000
                        });
                    }
                },
                (error) => {
                    console.log(error);
                    toast(error.message, { type: 'error' });
                },
                () => {
                    firebase.storage()
                        .ref('images')
                        .child(compressedFile.name)
                        .getDownloadURL()
                        .then((url) => {
                            switch (imageNumber) {
                                case 1:
                                    setImageOneURL(url);
                                    break;
                                case 2:
                                    setImageTwoURL(url);
                                    break;
                                case 3:
                                    setImageThreeURL(url);
                                    break;
                                case 4:
                                    setImageFourURL(url);
                                    break;
                                default:
                                    break;
                            }
                        });
                }
            );
        } catch (error) {
            toast(error.message, { type: 'error' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.database().ref('items').push({
            price,
            description,
            imageOneURL,
            imageTwoURL,
            imageThreeURL,
            imageFourURL,
            userUid,
        });
        toast('Posted Successfully', { type: 'success' });
        setSubmit('Submitted');
    };

    if (submit === 'Submitted') {
        return <Navigate to="/home" />;
    }



    return (
        <div className="new-item" style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
            <Navbar/>
            <Container className="mt-5">
                <h1 className="text-center">New Item</h1>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        {[1, 2, 3, 4].map((imageNumber) => (
                            <Form.Group as={Col} lg={3} md={3} sm={12} key={imageNumber} className="mb-3">
                                <Form.Label>Image {imageNumber}</Form.Label>
                                <Form.Control type="file" onChange={(e) => handleImageChange(e, imageNumber)} required />
                            </Form.Group>
                        ))}
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
        </div>
    );
};

export default NewItem;
