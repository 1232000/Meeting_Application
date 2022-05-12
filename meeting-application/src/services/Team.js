import axios from "axios";
import config from "../config";
import { getToken } from "./auth";

const teams = async () => {
    const response = await axios.get(`${config.BASE_URL}/teams`, {
        headers: {
            Authorization: getToken(),
        },
    });
    return response.data;
};

export { teams };
