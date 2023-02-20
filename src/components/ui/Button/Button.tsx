import React from 'react';
import './Button.scss';

type ButtonProps = {
    type: 'yellow';// | 'blue' | 'green' | 'red' //or whatever you want
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type, disabled, onClick, children }) => {
    const buttonClass = disabled ? 'disabled' : type;

    return (
        <button className={`Button ${buttonClass} text-p1`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
