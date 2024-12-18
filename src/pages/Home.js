import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Carousel, Container, Form, Button, Row, Col, Spinner } from "react-bootstrap"; 
import { database } from '../config';
import firebase from 'firebase';
import { toast, ToastContainer } from "react-toastify";
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import congrats from '../sounds/tada-fanfare-a-6313.mp3';
import fail from '../sounds/buzzer-or-wrong-answer-20582.mp3';
import generateMeta from '../components/openaicontroller';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function Home() {
    const [authState, setAuthState] = useState(null);
    const [userUid, setUserUid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingImages, setLoadingImages] = useState(true); 
    const index = parseInt(Cookies.get('index'));
    const [currentIndex, setCurrentIndex] = useState(index || null);
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [guesscounter, updateguesscounter] = useState(parseInt(Cookies.get('guesscount')) || 0);
    const [score, updatescore] = useState(parseInt(Cookies.get('score')) || 0);
    const [feedback, setFeedback] = useState("");
    const storedGuesses = Cookies.get('guesses');
    const [guesses, setGuesses] = useState(storedGuesses ? JSON.parse(storedGuesses) : []);
    const volume = Cookies.get('sound') || 100;
    const [currvolume, setvolume] = useState(volume ? volume / 100 : 1);
    const [hintVisible, setHintVisible] = useState(false);
    const [hintText, setHintText] = useState("");
    const [meta, setMeta] = useState(null);
    const { width, height } = useWindowSize()
    const [showConfetti, setShowConfetti] = useState(false);


    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                setAuthState(false);
            } else {
                setAuthState(true);
                setUserUid(user.uid);
            }
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await database.ref("items").once("value");
                const allItems = [];
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    allItems.push({
                        key: childSnapshot.key,
                        image1: data.imageOneURL,
                        image2: data.imageTwoURL,
                        image3: data.imageThreeURL,
                        image4: data.imageFourURL,
                        price: data.price,
                        description: data.description
                    });
                });
                setItems(allItems);

                if (currentIndex === null) {
                    const randomIndex = Math.floor(Math.random() * allItems.length);
                    setCurrentIndex(randomIndex);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [userUid]);

    useEffect(() => {
        if (userUid) {
            const userRef = database.ref("My-Profile");

            userRef.orderByChild("userUid").equalTo(userUid).once("value")
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        const userKey = Object.keys(userData)[0];
                        const currentHighScore = userData[userKey].highscore || 0;

                        if (score > currentHighScore) {
                            userRef.child(userKey).update({
                                highscore: score,
                            })
                                .then(() => {
                                    console.log("High score updated:", score);
                                })
                                .catch((error) => {
                                    console.error("Error updating high score:", error);
                                });
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [userUid, score]);

   
    const handleImageLoad = () => {
        const currentItem = items[currentIndex] || {};
        const imageCount = [currentItem.image1, currentItem.image2, currentItem.image3, currentItem.image4].filter(Boolean).length;

       
        let imagesLoaded = 0;
        const imageLoadHandler = () => {
            imagesLoaded += 1;
            if (imagesLoaded === imageCount) {
                setLoadingImages(false); 
            }
        };

    
        [currentItem.image1, currentItem.image2, currentItem.image3, currentItem.image4].forEach((imageUrl) => {
            if (imageUrl) {
                const img = new Image();
                img.src = imageUrl;
                img.onload = imageLoadHandler;
            }
        });
    };

    useEffect(() => {
        if (items.length > 0) {
            setLoadingImages(true);
            handleImageLoad(); 
        }
    }, [items, currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setPrice(0);
        setFeedback("");
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentItem = items[currentIndex] || {};
        toast.dismiss();

        const guessedPrice = parseFloat(price);
        if (isNaN(parseInt(guessedPrice))) {
            toast(`Please enter a price`);
            return;
        }
        const actualPrice = parseFloat(currentItem.price);

        if (guessedPrice >= (actualPrice - 1) && guessedPrice <= (actualPrice + 1)) {
            toast(`Congrats! You win!`);
            const congratsAudio = new Audio(congrats);
            congratsAudio.volume = currvolume;
            congratsAudio.play();
            updateguesscounter(0);
            updatescore(score + 1);
            setMeta(null);
            setGuesses([]);
            handleNext();
            setShowConfetti(true);
            setTimeout(() => {
                setShowConfetti(false);
            }, 3000);
        } else {
            updateguesscounter(guesscounter + 1);
            const failAudio = new Audio(fail);
            failAudio.volume = currvolume;
            failAudio.play();
            let feedbackMessage = guessedPrice < actualPrice ? "Too low! Try again." : "Too high! Try again.";
            setFeedback(feedbackMessage);
            setGuesses([...guesses, { price: guessedPrice, feedback: feedbackMessage }]);

            if (guesscounter === 4) {
                toast(`You Lose the correct price was $${actualPrice}`);
                failAudio.play();
                updateguesscounter(0);
                updatescore(0);
                setGuesses([]);
                handleNext();
            } else {
                toast(`Try Again`);
            }
        }
    };

    const handleHintToggle = () => {
        setHintVisible(!hintVisible);
    };

    const handleHintChange = (e) => {
        setHintText(e.target.value);
    };

    const hintSubmit = async (e) => {
        e.preventDefault();
        const generatedMeta = await generateMeta(hintText, parseFloat(currentItem.price), currentItem.description);
        setMeta(generatedMeta);
        console.log("Generated Meta:", generatedMeta);
    };

    useEffect(() => {
        Cookies.set('score', score, { expires: 7 });
        Cookies.set('guesscount', guesscounter, { expires: 7 });
        Cookies.set('guesses', JSON.stringify(guesses), { expires: 7 });
        Cookies.set('index', currentIndex, { expires: 7 });
    }, [score, guesscounter, guesses, currentIndex]);

    const currentItem = items[currentIndex] || {};

    return (
        <div>
      
            <NavBar />
            <ToastContainer limit={1} autoClose={1500} />
            {showConfetti && <Confetti width={width} height={height} />}
            <div
                style={{
                    width: "100%",
                    minHeight: '100vh',
                    background: "linear-gradient(to bottom, black, gray)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {loading || loadingImages ? ( 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <Spinner animation="border" role="status" style={{ width: '5rem', height: '5rem', color: 'white' }}>
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Container fluid style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                        <Row>
                            <Col xs={12} lg={8} className="d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                                <Container style={{ width: '500px', padding: '0' }}>
                                    <Carousel>
                                        {currentItem.image1 && (
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100 img-thumbnail"
                                                    src={currentItem.image1}
                                                    alt="Slide 1"
                                                    style={{ maxHeight: '500px', objectFit: 'contain', minHeight: '500px' }}
                                                />
                                            </Carousel.Item>
                                        )}
                                        {currentItem.image2 && (
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100 img-thumbnail"
                                                    src={currentItem.image2}
                                                    alt="Slide 2"
                                                    style={{ maxHeight: '500px', objectFit: 'contain', minHeight: '500px' }}
                                                />
                                            </Carousel.Item>
                                        )}
                                        {currentItem.image3 && (
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100 img-thumbnail"
                                                    src={currentItem.image3}
                                                    alt="Slide 3"
                                                    style={{ maxHeight: '500px', objectFit: 'contain', minHeight: '500px' }}
                                                />
                                            </Carousel.Item>
                                        )}
                                        {currentItem.image4 && (
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100 img-thumbnail"
                                                    src={currentItem.image4}
                                                    alt="Slide 4"
                                                    style={{ maxHeight: '500px', objectFit: 'contain', minHeight: '500px' }}
                                                />
                                            </Carousel.Item>
                                        )}
                                    </Carousel>
                                    <div>
                                        <Button
                                            variant="secondary"
                                            onClick={handleHintToggle}
                                            style={{ marginTop: '1rem', width: '100%' }}
                                        >
                                            {hintVisible ? 'Hide Hint' : 'Hint'}
                                        </Button>
                                        {hintVisible && (
                                            <Form.Group controlId="formHint" style={{ marginTop: '1rem' }}>
                                                <Form.Label style={{ color: 'white' }}>Type your hint prompt:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Cool hint here..."
                                                    value={hintText}
                                                    onChange={handleHintChange}
                                                    style={{ borderRadius: '0.25rem' }}
                                                />
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    style={{ width: '100%' }}
                                                    onClick={hintSubmit}
                                                >
                                                    Submit
                                                </Button>
                                                <p style={{ color: 'white' }}>{meta}</p>
                                            </Form.Group>
                                        )}
                                    </div>
                                </Container>
                            </Col>
    
                            <Col xs={12} lg={4} className="d-flex justify-content-center align-items-center">
                                <div style={{ position: 'relative', width: '100%' }}>
                                    <p style={{
                                        position: 'absolute',
                                        fontSize: '3rem',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textAlign: 'center',
                                        width: '100%',
                                        zIndex: 1
                                    }}>
                                        SCORE: {score}
                                    </p>
    
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '100%',
                                        paddingTop: '4rem',
                                    }}>
    
                                        <div style={{
                                            backgroundColor: 'white',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                            width: '300px',
                                            marginBottom: '1rem',
                                            position: 'relative',
                                        }}>
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group controlId="formPrice">
                                                    <Form.Label>Enter Price</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Enter price"
                                                        value={price}
                                                        onChange={handlePriceChange}
                                                        style={{ borderRadius: '0.25rem' }}
                                                    />
                                                </Form.Group>
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    style={{ marginTop: '1rem', width: '100%' }}
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                            <p style={{ marginTop: '1rem', color: 'black' }}>
                                                {currentItem.description || "No description available."}
                                            </p>
                                        </div>
    
                                        <div style={{
                                            backgroundColor: 'white',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                            width: '300px',
                                        }}>
                                            <h5>Guesses Left: {5 - guesscounter}</h5>
                                            <h5>Previous Guesses</h5>
                                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                                {guesses.length > 0 ? (
                                                    guesses.map((guess, index) => (
                                                        <li key={index} style={{ marginBottom: '0.5rem' }}>
                                                            <strong>Guess: ${guess.price}</strong> - {guess.feedback}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p>No guesses made yet.</p>
                                                )}
                                            </ul>
                                        </div>
    
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )}
            </div>
        </div>
    );}