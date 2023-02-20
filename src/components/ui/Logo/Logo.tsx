import React from 'react';
import { ReactComponent as LogoImg } from '../../../assets/images/Logo.svg';

type LogoProps = {

}
const Logo: React.FC<LogoProps> = () => {
    return (
        <div className={'app-logo'}>
            <LogoImg />
        </div>
    );
};

export default Logo;