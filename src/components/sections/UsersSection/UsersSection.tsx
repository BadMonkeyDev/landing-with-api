import React, {useEffect, useRef, useState} from 'react';
import './UsersSection.scss'
import Button from "../../ui/Button/Button";
import useFetchUsers from "../../../hooks/useFetchUsers";
import Loader from "../../ui/Loader/Loader";
import UsersTable from "../../widgets/UsersTable/UsersTable";
import {useUserContext} from "../../../store/UsersContext";

const UsersSection = React.forwardRef<HTMLDivElement>((props, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const {response, isLoading} = useFetchUsers({ page: currentPage, count: 6 });
    const {users, setUsers} = useUserContext();
    const userButtonRef = useRef<HTMLDivElement>(null);

    const handleShowMore = () => {
        setCurrentPage(currentPage + 1);
        if (userButtonRef.current) {
            userButtonRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    // When response changes, add the new users to the existing list of users
    useEffect(() => {
        if (response?.users) {
            setUsers([...users, ...response.users]);
        }
    }, [response]);


    return (
            <div className={'app-users-section container'} ref={ref}>
                <h2 className={'text-h1'}>Working with GET request</h2>
                <div>
                    <Loader isLoading={isLoading} />
                    <UsersTable users={users} />
                    <div ref={userButtonRef} ></div>
                </div>
                {response?.links.next_url && (
                    <Button type={'yellow'} onClick={handleShowMore} >
                        Show more
                    </Button>
                )}
            </div>
    );
});

export default UsersSection;