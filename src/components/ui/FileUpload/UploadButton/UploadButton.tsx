import React from 'react';
import './UploadButton.scss'

type UploadButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;

    isError: boolean;
};
const UploadButton: React.FC<UploadButtonProps> = ({onClick, children, isError}) => {
    return (
        <button
            className={`upload-button text-p1 ${isError ? 'error' : ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default UploadButton;