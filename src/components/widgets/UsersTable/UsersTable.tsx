import React from 'react';
import classes from './UsersTable.module.scss'

import Card from "../../ui/Card/Card";
import {User} from "../../../types/User";

interface UsersTableProps {
    users: User[]
}

const UsersTable: React.FC<UsersTableProps> = ({users}) => {
    return (
        <div className={classes.userCards}>
            {users.map((user, index) => (
                <Card
                    key={index}
                    imgUrl={user.photo}
                    fullName={user.name}
                    jobPosition={user.position}
                    email={user.email}
                    phoneNumber={user.phone}
                />
            ))}
        </div>

    );
};

export default UsersTable;