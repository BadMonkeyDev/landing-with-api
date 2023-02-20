import {useEffect, useState} from 'react';
import axios from 'axios';
import {User} from "../types/User";

export interface Links {
    next_url: string | null;
    prev_url: string | null;
}

interface ApiResponse {
    success: boolean;
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    links: Links
    users: User[];
}

export interface Options {
    page?: number;
    offset?: number;
    count?: number;
}

const useFetchUsers = (options: Options) => {
    const {page, offset, count = 6} = options
    const [response, setResponse] = useState<ApiResponse>()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        let isMounted = true;
        const params: Options = { count };
        if (offset !== undefined) {
            params.offset = offset;
        } else if (page !== undefined) {
            params.page = page;
        }
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const {data} = await axios.get<ApiResponse>(
                    'https://frontend-test-assignment-api.abz.agency/api/v1/users',
                    {params}
                );
                if (isMounted) {
                    setResponse(data);
                }
            } catch (err) {
                setError('Error fetching users.');
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchUsers();

    }, [page, offset, count]);

    return {response, isLoading, error};
};

export default useFetchUsers;
