import React, { useState } from 'react';
import './App.css';
import { UserContext } from './components/UserContext';
import SignIn from './pages/SignIn';

function SignInApp() {
    const [user, setUser] = useState(null);
    document.title = "Guess The Price";

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <SignIn />
        </UserContext.Provider>
    );
}

export default SignInApp;