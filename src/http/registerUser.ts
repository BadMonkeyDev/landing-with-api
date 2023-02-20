import axios from "axios";

interface RegistrationResponseSuccess {
    success: true;
    user_id: number;
    message: string;
}

interface RegistrationResponseError {
    success: false;
    message: string;
    status?: number;
    fails?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        position_id?: string[];
        photo?: string[];
    };
}

type RegistrationResponse = RegistrationResponseSuccess | RegistrationResponseError;

export async function registerUser(token: string, formData: FormData): Promise<RegistrationResponse> {
    try {
        const response = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, {
            headers: { Token: token },
            validateStatus: function (status) {
                return true;
            }
        });
        if (response.status === 201) {
            const { success, user_id, message } = response.data;
            if (success) {
                return { success, user_id, message };
            } else {
                return { success, message };
            }
        } else if (response.status === 401) {
            const { message } = response.data;
            return { success: false, message };
        } else if (response.status === 409) {
            const { message } = response.data;
            return { success: false, message };
        } else if (response.status === 422) {
            const { message, fails } = response.data;
            return { success: false, message, fails };
        } else {
            throw new Error("Unexpected server response.");
        }
    } catch (error: unknown) {
        return { success: false, message: "Error registering user - " + (error as Error).message };
    }
}
