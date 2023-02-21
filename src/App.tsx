import React, {useRef} from 'react';
import './App.scss';

import {UserProvider} from "./store/UsersContext";

import {ThemeProvider} from '@mui/material/styles';
import {muiTheme} from "./muiTheme";

import Header from "./components/sections/Header/Header";
import HeroSection from "./components/sections/HeroSection/HeroSection";

const  UsersSection =  React.lazy(() => import("./components/sections/UsersSection/UsersSection"));
const RegistrationSection  = React.lazy(() => import("./components/sections/RegistrationSection/RegistrationSection"));

function App() {
    const usersBlockRef = useRef<HTMLDivElement>(null);
    const signupBlockRef = useRef<HTMLDivElement>(null);
    return (
        <ThemeProvider theme={muiTheme}>
            <UserProvider>
                <div className="App">
                    <Header usersRef={usersBlockRef} signupRef={signupBlockRef} />
                    <div className="content">
                        <HeroSection signupRef={signupBlockRef} />
                        <UsersSection ref={usersBlockRef} />
                        <RegistrationSection ref={signupBlockRef} />
                    </div>
                </div>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
