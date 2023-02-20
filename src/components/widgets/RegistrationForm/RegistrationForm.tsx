import React, {useEffect, useState} from 'react';

import Input from "../../ui/Input/Input";
import Loader from "../../ui/Loader/Loader";
import RadioGroup from "../../ui/RadioGroup/RadioGroup";
import {FileUpload} from "../../ui/FileUpload/FileUpload";
import classes from './RegistrationForm.module.scss'
import Button from "../../ui/Button/Button";

import usePositions from "../../../hooks/usePositions";

import {createFormData} from "../../../utils/formDataUtils";

import {getToken} from "../../../utils/tokenUtils";
import {registerUser} from "../../../http/registerUser";
import {IIsFormValid, ValidityType} from "../../sections/RegistrationSection/RegistrationSection";

interface RegistrationFormProps {
    setIsRegistrationSuccess: (status: boolean) => void
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({setIsRegistrationSuccess}) => {
    const [inputName, setInputName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputPhone, setInputPhone] = useState('')
    const [selectedOption, setSelectedOption] = useState('');
    const [file, setFile] = useState<File>({} as File)

    const [fieldsValidity, setFieldsValidity] = useState<IIsFormValid>({
        name: false,
        email: false,
        phone: false,
        position: false,
        file: false
    })
    const [isFormValid, setIsFormValid] = useState(false)
    const [isReady, setIsReady] = useState(true)

    const { positions, isLoading} = usePositions();

    const handleValidityChange = (type: ValidityType, isValid: boolean) => {
        if (fieldsValidity[type] !== isValid) {
            setFieldsValidity((prevState) => ({ ...prevState, [type]: isValid }));
        }
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        handleValidityChange('position', true)
    };

    const handleSignupClick = () => {
        setIsReady(false)
        getToken().then(tokenData => {
            if (tokenData && tokenData?.token) {
                const fData = createFormData(inputName, inputEmail, inputPhone, selectedOption, file)
                registerUser(tokenData.token, fData).then(response => {
                    if (response.success) {
                        setIsRegistrationSuccess(true)
                    }
                }).finally(() => setIsReady(true))
            }
        })
    }

    useEffect(() => {
        if (Object.values(fieldsValidity).every((value) => value === true)) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
    }, [fieldsValidity])

    if (isReady) {
        return (
            <>
                <div className={classes.registrationForm}>
                    <div className={classes.formInputs}>
                        <Input type={'name'} label={'Your name'} value={inputName} onChange={setInputName} onValidityChange={(fieldsValidity)=> handleValidityChange('name', fieldsValidity)}/>
                        <Input type={'email'} label={'Email'} value={inputEmail} onChange={setInputEmail} onValidityChange={(fieldsValidity)=> handleValidityChange('email', fieldsValidity)}/>
                        <Input type={'phone'} label={'Phone'} value={inputPhone} onChange={setInputPhone} onValidityChange={(fieldsValidity)=> handleValidityChange('phone', fieldsValidity)}/>
                    </div>
                    <Loader isLoading={isLoading} />
                    {positions && <RadioGroup
                        name="options"
                        label="Select your position"
                        value={selectedOption}
                        onChange={handleRadioChange}
                        options={positions}
                    />}
                    <div className={classes.formFileUpload}>
                        <FileUpload  onFileSelected={(file) => {setFile(file)}} onValidityChange={(fieldsValidity)=> handleValidityChange('file', fieldsValidity)}/>
                    </div>
                    <div className={classes.formButton}>
                        <Button type={"yellow"} disabled={!isFormValid} onClick={handleSignupClick}>Sign up</Button>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <Loader isLoading={true} />
        );
    }
};

export default RegistrationForm;