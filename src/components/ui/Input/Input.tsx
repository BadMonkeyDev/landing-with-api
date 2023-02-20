import React, {useEffect, useState} from 'react';
import {TextField} from '@mui/material';

export type InputType = 'name' | 'email' | 'phone';

interface IValidationRules  {
    pattern?: RegExp;
    errorMessage?: string;
    helperMessage?: string;
}

interface InputProps {
    type: InputType;
    label: string;
    value: string;
    onChange: (event: string) => void;
    onValidityChange: (isValid: boolean) => void;
    validationRules?: IValidationRules
}

const defaultRules = {
    email: {
        // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        // eslint-disable-next-line no-control-regex
        pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/gm,
        errorMessage: ' ',              // "Example: name@example.com",
        helperMessage: ' ',              // "Example: name@example.com",
    },
    phone: {
        pattern: /^\+380\d{9}$/,
        errorMessage: "+38 (XXX) XXX - XX - XX",
        helperMessage: "+38 (XXX) XXX - XX - XX",
    },
    name: {
        pattern: /^(?!\S*\d)\S{2,}(?:\s\S+)*$/,
        errorMessage: ' ',
        helperMessage: ' ',
    },
};

const Input: React.FC<InputProps> = ({
                                         type,
                                         label,
                                         value,
                                         onChange,
                                         onValidityChange,
                                         validationRules = {}
                                     }) => {
    const { pattern = defaultRules[type].pattern, errorMessage = defaultRules[type].errorMessage, helperMessage = defaultRules[type].helperMessage } = validationRules;
    const [isValid, setIsValid] = useState(false)
    const [error, setError] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        // Validate input value against regex pattern
        if (pattern) {
            const isMatch = pattern.test(newValue);
            setError(!isMatch);
            setIsValid(isMatch)
        }

        onChange(newValue);
        if (!newValue) {
            setError(false)
            setIsValid(false)
        }
    };

    useEffect(() => {
        if (typeof onValidityChange === "function") {
            onValidityChange(isValid)
        }
    }, [isValid])

    return (
        <TextField
            label={label}
            value={value}
            onChange={handleChange}
            variant="outlined"
            error={error}
            helperText={error ? errorMessage : helperMessage}
            fullWidth
            sx={{
                '& .MuiInputBase-input, & .MuiOutlinedInput-input': {
                    padding: '15.5px 14px',
                }
            }}
        />
    );
};

export default Input;
