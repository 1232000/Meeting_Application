import axios from "axios";

import config from "../config";

import store from "../store";

import { login as loginAC, logout as logoutAC } from "../actions/creators";

const login = async (credentials) => {
    const response = await axios.post(
        `${config.BASE_URL}/auth/login`,

        credentials,

        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const { email, token } = response.data;

    localStorage.setItem("TOKEN", token);

    localStorage.setItem("EMAIL", email);

    store.dispatch(loginAC(token, email));
};

const register = async (credentials) => {
    const response = await axios.post(
        `${config.BASE_URL}/auth/register`,

        credentials,

        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};

const logout = () => {
    localStorage.removeItem("TOKEN");

    localStorage.removeItem("EMAIL");

    store.dispatch(logoutAC());
};

const getToken = () => {
    return localStorage.getItem("TOKEN");
};

const getEmail = () => {
    return localStorage.getItem("EMAIL");
};

const isAuthenticated = () => {
    if (localStorage.getItem("TOKEN") !== null) {
        return true;
    } else {
        return false;
    }
};

export { login, logout, getToken, getEmail, register, isAuthenticated };
