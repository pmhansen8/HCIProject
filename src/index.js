import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home'
import NewItem from "./pages/UploadNewItem";
import HowToPlay from "./pages/HowToPlay"
import About from "./pages/About"
import LeaderBoard from "./pages/LeaderBoard"
import Profile from "./pages/Profile"
import SignInApp from "./SignInApp"
import Landing from "./pages/Landing"
import Settings from "./pages/Settings"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/sign-up" element={<App />} /> {/* Use 'element' instead of 'component' */}
            <Route path="/home" element={<Home />}></Route>
            <Route path="/new-item" element={<NewItem />}></Route>
            <Route path="/how-to-play" element={<HowToPlay />}></Route>
            <Route path="/about-us" element={<About />}></Route>
            <Route path="/leader-board" element={<LeaderBoard />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/sign-in" element={<SignInApp />}></Route>
            <Route path = "/" element={<Landing/>}></Route>
            <Route path ="/settings" element={<Settings/>}></Route>
        </Routes>
    </Router>,
    document.getElementById('root')
);
