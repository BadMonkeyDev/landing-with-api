import {fetchToken, TokenData} from "../http/fetchToken";

const TOKEN_STORAGE_KEY = 'token';

function addTokenToStorage(tokenData: TokenData): boolean {
    try {
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokenData));
        return true;
    } catch (error) {
        console.error('Error adding token to storage:', error);
        return false;
    }
}

function getTokenDataFromStorage(): TokenData | null {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedToken) {
        return null;
    }
    const { token, expiration } = JSON.parse(storedToken);
    return { token, expiration };
}

export function deleteTokenFromStorage(): boolean {
    try {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error deleting token from storage:', error);
        return false;
    }
}
export function checkExpiration(): boolean {
    const tokenData = getTokenDataFromStorage();
    if (!tokenData) {
        return true;
    }

    const now = Date.now();
    return now - tokenData.expiration > 0;
}

export async function getToken(): Promise<TokenData | null> {
    const isExpired = checkExpiration()
    if (isExpired) {
        deleteTokenFromStorage()
        const {success, data} = await fetchToken()
        if (success && data && "token" in data && "expiration" in data) {
            const token:TokenData = {
                token: data.token,
                expiration: data.expiration
            }
            addTokenToStorage(token)
            return token
        } else {
            return null;
        }
    } else {
        return getTokenDataFromStorage()
    }
}

