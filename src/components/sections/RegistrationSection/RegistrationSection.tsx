import React, {useEffect, useState} from 'react';
import './RegistrationSection.scss'
import success from '../../../assets/images/success-image.svg'
import RegistrationForm from "../../widgets/RegistrationForm/RegistrationForm";
import {useUserContext} from "../../../store/UsersContext";
import {fetchUsers} from "../../../http/fetchUsers";

export interface IIsFormValid {
    name: boolean;
    email: boolean;
    phone: boolean;
    position: boolean;
    file: boolean;
}

export type ValidityType = 'name' | 'email' | 'phone' | 'position' | 'file';

const RegistrationSection = React.forwardRef<HTMLDivElement>((props, ref) => {
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false)
    const {setUsers} = useUserContext();

    useEffect(() => {
        if (isRegistrationSuccess) {
            fetchUsers({page: 1, count: 6}).then(response => {
                if (response.success && 'users' in response) {
                    setUsers(response.users)
                }
            })

        }
    }, [isRegistrationSuccess])

    return (
        <div className={'app-registration-section container'} ref={ref}>
            <h2 className={'text-h1'}>{isRegistrationSuccess ? 'User successfully registered' : 'Working with POST request'}</h2>
            {isRegistrationSuccess ? <img className={'success-image'} src={success}  alt={'registration success'} /> : <RegistrationForm setIsRegistrationSuccess={setIsRegistrationSuccess} />}
        </div>
    );
});

export default RegistrationSection;