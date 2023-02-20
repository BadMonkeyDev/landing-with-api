import React from 'react';
import './UploadText.scss'

type UploadTextProps = {
    fileName?: string;
    isError: boolean;
};

const UploadText: React.FC<UploadTextProps> = ({fileName, isError}) => {
    return (
        <div
            className={`upload-text text-p1 ${fileName ? 'attached' : '' } ${isError ? 'error' : ''}`}
        >
            {fileName || 'Upload your photo'}
        </div>
    );
};

export default UploadText;