import React, {useState} from 'react';
import './RadioGroup.scss'
import { FormControl, FormLabel, RadioGroup as MaterialRadioGroup, FormControlLabel, Radio } from '@mui/material';
import {IPosition} from "../../../hooks/usePositions";

interface RadioGroupProps {
    name: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    options: IPosition[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, label, value, onChange, options }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className={'radio-group'}>
            <FormControl >
                <FormLabel component="legend" focused={focused} sx={{color: "black"}}>
                    {label}
                </FormLabel>
                <MaterialRadioGroup aria-label={name} name={name} value={value} onChange={onChange}>
                    {options.map(({ id, name }) => (
                        <FormControlLabel key={id} value={id} control={<Radio />} label={name} />
                    ))}
                </MaterialRadioGroup>
            </FormControl>
        </div>
    );
};

export default RadioGroup;