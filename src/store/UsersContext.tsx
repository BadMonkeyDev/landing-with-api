import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {User} from "../types/User";

interface UserContextType {
    users: User[];
    setUsers: (users:User[]) => void;
}

const UserContext = createContext<UserContextType>({
    users: [],
    setUsers: () => {
    },
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [users, setUsers] = useState<User[]>([]);

    return (
        <UserContext.Provider value={{users, setUsers}}>
            {children}
        </UserContext.Provider>
    );
};
