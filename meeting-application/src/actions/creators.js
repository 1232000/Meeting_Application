import { LOGIN, LOGOUT } from "./constants";

const login = (token, email) => {
    return {
        type: LOGIN,
        payload: {
            token,
            email,
        },
    };
};

const logout = () => {
    return {
        type: LOGOUT,
    };
};

export { login, logout };
