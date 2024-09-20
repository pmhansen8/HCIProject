
import Navbar from '../components/NavBar'
import React from "react";
import { useNavigate, NavLink as Link} from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

export default function Settings(){

    const Navigate = useNavigate();
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <>
            <Navbar/>
            <div style={{
                background: "linear-gradient(to bottom, black, gray)",
                color: 'white',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center'
            }}>

                <div style={{
                    width: "80%",
                    height: '80vh',
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}>
                    <p style={{ color: 'black', fontSize: '4em'}}>
                        Settings
                    </p>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}>

<Box sx={{ width: 500 }}>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        <VolumeDown style={{color: "black"}}/>
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
        <VolumeUp style={{color: "black"}} />
      </Stack>
    </Box>

                        <p style={{fontSize: "3em", color: "black"}}>
                             {value}
                        </p>

                        

                      
                    </div>
                </div>
            </div>
        </>
    )

}