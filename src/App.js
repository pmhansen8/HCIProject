import React, { useState } from 'react';
import './App.css';
import { UserContext } from './components/UserContext';
import SignUp from './pages/SignUp';

function App() {
    const [user, setUser] = useState(null);
    document.title = "Guess The Price";

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <SignUp />
        </UserContext.Provider>
    );
}

export default App;