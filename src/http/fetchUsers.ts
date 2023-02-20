import axios from 'axios';
import {User} from "../types/User";

export interface Options {
    page?: number;
    offset?: number;
    count?: number;
}


export interface Links {
    next_url: string | null;
    prev_url: string | null;
}

interface ApiResponseSuccess {
    success: boolean;
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    links: Links;
    users: User[];
}

interface ApiResponseError {
    success: boolean;
    message: string;
    fails?: {
        count?: string[];
        page?: string[];
    }
}

type ApiResponse = ApiResponseSuccess | ApiResponseError

export async function fetchUsers(options: Options): Promise<ApiResponse> {
    const { page, offset, count = 6 } = options;
    const params: Options = { count };
    if (offset !== undefined) {
        params.offset = offset;
    } else if (page !== undefined) {
        params.page = page;
    }
    try {
        const response = await axios.get(
            'https://frontend-test-assignment-api.abz.agency/api/v1/users',
            { params: { page, offset, count }, validateStatus: function (status) {
                    return true;
                }}
        );
        if (response.status === 200) {
            return response.data as ApiResponseSuccess
        } else if (response.status === 404) {
            throw {error: {message: response.data.message}}
        } else if (response.status === 422) {
            throw {error: {message: response.data.message, fails: response.data.fails}}
        } else {
            throw new Error(`Unexpected server response with status ${response.status}`);
        }
    } catch (error: unknown) {
        return { success: false, message: "Error fetching users - " + (error as Error).message } as ApiResponseError;
    }
}
