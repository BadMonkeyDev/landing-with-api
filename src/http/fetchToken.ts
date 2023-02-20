import axios, {AxiosResponse} from "axios";

interface TokenResponse {
    success: boolean;
    token: string;
}

export interface TokenReturn {
    success: boolean;
    data: TokenData | ErrorData;
}

export interface TokenData {
    token: string;
    expiration: number;
}

export interface ErrorData {
    error: string
}

const TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token';
const TOKEN_EXPIRATION_TIME = 40 * 60 * 1000; // 40 minutes in milliseconds

export async function fetchToken(): Promise<TokenReturn> {
    let result: AxiosResponse<TokenResponse> | null = null;
    try {
        result = await axios.get<TokenResponse>(TOKEN_URL);
        return {success: result?.data.success, data: {token: result?.data.token, expiration: Date.now() + TOKEN_EXPIRATION_TIME}}
    } catch (error) {
        return { success: false, data: {error: "Error fetching token"}}
    }
}