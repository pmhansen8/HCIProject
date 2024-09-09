import React, { useState, useContext, useEffect } from 'react';
import {Navigate, NavLink as Link} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../components/NavBar';
import { UserContext } from '../components/UserContext';
import { auth } from '../config'; // Ensure this is correctly imported from your config file

export default function SignIn() {
    const context = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password);
            toast(`Welcome back ${user.displayName || user.email}`, { type: "success" });
            context.setUser({ email: user.email, uid: user.uid });
        } catch (error) {
            toast("Wrong Password");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                context.setUser({ email: user.email, uid: user.uid });
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [context]);

    if (!context.user) {
        return (
            <div>
                <ToastContainer />
                <Navbar />
                <div style={{
                    width: "100%",
                    height: '100vh',
                    backgroundColor: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <form onSubmit={handleSignIn} style={{textAlign: 'center', color: 'white'}}>
                        <h2>Sign In</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{margin: '10px', padding: '10px'}}
                        />
                        <br/>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{margin: '10px', padding: '10px'}}
                        />
                        <br/>
                        <button type="submit" disabled={loading} style={{
                            padding: '10px 20px',
                            backgroundColor: 'blue',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                        <p>Don't Have an account? <Link to="/"> Sign Up</Link></p>
                    </form>
                </div>
            </div>
        );
    } else {
        return <Navigate to="/home" />;
    }
}
