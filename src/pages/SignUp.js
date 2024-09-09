import React, { useState, useContext, useEffect } from 'react';
import { Navigate , NavLink as Link} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../components/NavBar';
import { UserContext } from '../components/UserContext';
import { auth, database } from '../config'; // Ensure these are correctly imported from your config file

export default function SignUp() {
    const context = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserSignIn(user);
        } catch (error) {
            toast(error.message, { type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleUserSignIn = async (user) => {
        try {
            const snapshot = await database.ref("My-Profile")
                .orderByChild("email")
                .equalTo(user.email)
                .once("value");

            if (snapshot.exists()) {
                // Account already exists, sign in with this user
                toast(`Welcome back ${user.displayName || user.email}`, { type: "success" });
                context.setUser({ email: user.email, uid: user.uid });
            } else {
                // No account found, create a new profile
                await database.ref("My-Profile").push({
                    email: user.email,
                    userUid: user.uid,
                    highscore: 0
                });
                toast(`Welcome ${user.displayName || user.email}`, { type: "success" });
                context.setUser({ email: user.email, uid: user.uid });
            }
        } catch (error) {
            toast("An error occurred while checking the account", { type: "error" });
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
                    <form onSubmit={handleSignUp} style={{ textAlign: 'center', color: 'white' }}>
                        <h2>Sign Up</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ margin: '10px', padding: '10px' }}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ margin: '10px', padding: '10px' }}
                        />
                        <br />
                        <button type="submit" disabled={loading} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <p>Already Have an account? <Link to="/sign-in"> Sign in</Link></p>
                    </form>
                </div>
            </div>
        );
    } else {
        return <Navigate to="/home" />;
    }
}
