import axios from "axios";
import config from "../config";
import { getToken } from "./auth";

const getUsers = async () => {
    const response = await axios.get(`${config.BASE_URL}/users`, {
        headers: {
            Authorization: getToken(),
        },
    });
    return response.data;
};
export { getUsers };
