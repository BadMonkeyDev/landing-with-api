import React, {useEffect, useRef, useState} from 'react';
import './FileUpload.scss';
import UploadButton from './UploadButton/UploadButton';
import UploadText from './UploadText/UploadText';
import TextField from '@mui/material/TextField';

import {ResizeImage} from "../../../helper/ResizeImage";

interface IImageValidationRules {
    allowedTypes: string[];
    maxFileSize: number;
    minResolution: { width: number; height: number };
}

interface IFileUploadProps {
    onFileSelected: (file: File) => void;
    onValidityChange: (isValid: boolean) => void;
    imageValidationRules?: IImageValidationRules;
}

const DEFAULT_IMAGE_VALIDATION_RULES: IImageValidationRules = {
    allowedTypes: ['image/jpeg'],
    maxFileSize: 5 * 1024 * 1024,
    minResolution: { width: 70, height: 70 },
};

export const FileUpload = ({
                               onFileSelected,
                               onValidityChange,
                               imageValidationRules = DEFAULT_IMAGE_VALIDATION_RULES,
                           }: IFileUploadProps) => {
    const [isError, setIsError] = useState(false);
    const [fileName, setFileName] = useState('');
    const [isValid, setIsValid] = useState(false)

    const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name.split('.')[0]);
            if (
                !imageValidationRules.allowedTypes.includes(selectedFile.type) ||
                selectedFile.size > imageValidationRules.maxFileSize
            ) {
                setIsError(true);
                setIsValid(false)
            } else {
                const image = new Image();
                const resizedImage = await ResizeImage(selectedFile, 70, 70, 1)
                //@ts-ignore
                image.src = resizedImage.preview;

                image.onload = () => {
                    if (image.width !== imageValidationRules.minResolution.width || image.height !== imageValidationRules.minResolution.height) {
                        setIsError(true);
                        setIsValid(false)
                    } else {
                        setIsError(false);
                        setIsValid(true)
                        onFileSelected(selectedFile);
                    }
                };
            }
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.click();
        }
    };

    useEffect(() => {
        if (typeof onValidityChange === "function") {
            onValidityChange(isValid)
        }
    }, [isValid])

    return (
        <>
            <div className={'file-upload'}>
                <UploadButton onClick={handleClick} isError={isError}>
                    Upload
                </UploadButton>
                <UploadText isError={isError} fileName={fileName} />
            </div>
            <TextField inputRef={inputRef} style={{ display: 'none' }} type="file" onChange={handleFileSelected} />
            <div className={'error-message text-small'}>{isError ? 'Error: Invalid file type, size or resolution' : ' '}</div>
        </>
    );
};
