import React from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    Tooltip,
    MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../config'; // Make sure this is correctly imported from your config file
import '../Header.css';

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(!!auth.currentUser); // Track authentication state
    const navigate = useNavigate(); // Use useNavigate for redirection

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setLoggedIn(false); // Update authentication state
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: 'orange' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, color: "white", mr: 2, fontSize: '2rem' }}
                            >
                                Guess The Price?
                            </Typography>
                        </Link>
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <Typography textAlign="center" >Home</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="/about-us" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <Typography textAlign="center" >About Us</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="/leader-board" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <Typography textAlign="center" >LeaderBoard</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="/how-to-play" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <Typography textAlign="center" >How To Play</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="/settings" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <Typography textAlign="center" >Settings</Typography>
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                            </Button>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link to='/about-us' style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link>
                            </Button>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link to="/leader-board" style={{ color: 'inherit', textDecoration: 'none' }}>LeaderBoard</Link>
                            </Button>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link to='/how-to-play' style={{ color: 'inherit', textDecoration: 'none' }}>How To Play</Link>
                            </Button>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link to="/settings" style={{ color: 'inherit', textDecoration: 'none' }}>Settings</Link>
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <FontAwesomeIcon icon={faUserCircle} size="lg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link
                                        to="/profile"
                                        style={{ textDecoration: 'none' }} // Remove underline
                                    >
                                        <Typography textAlign="center" style={{ color: 'black' }}>
                                            Profile
                                        </Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={loggedIn ? handleLogout : () => navigate("/sign-up")}>
                                    <Typography textAlign="center">
                                        {loggedIn ? "Log Out" : "Sign Up"}
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Navbar;
