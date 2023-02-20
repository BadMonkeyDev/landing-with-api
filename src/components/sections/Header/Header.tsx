import React from 'react';
import './Header.scss'
import Logo from "../../ui/Logo/Logo";
import Button from "../../ui/Button/Button";

interface HeaderProps {
    usersRef: React.RefObject<HTMLElement>;
    signupRef: React.RefObject<HTMLElement>;
}
const Header = (props:HeaderProps) => {
    const {usersRef, signupRef} = props
    return (
        <div className={'app-header'}>
            <div className="container">
                <Logo/>
                <div className={'actions'}>
                    <Button type={"yellow"} onClick={() => {
                            usersRef?.current?.scrollIntoView({behavior: "smooth"})
                    }
                    }>Users</Button>
                    <Button type={"yellow"} onClick={() => {
                        signupRef?.current?.scrollIntoView({behavior: "smooth"})
                    }
                    }>Sign Up</Button>
                </div>
            </div>
        </div>
    );
};

export default Header;