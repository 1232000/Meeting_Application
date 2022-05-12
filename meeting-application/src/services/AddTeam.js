import axios from "axios";
import config from "../config";
import { getToken } from "./auth";

const addTeam = async (team) => {
    const response = await axios.post(`${config.BASE_URL}/teams`, team, {
        headers: {
            Authorization: getToken(),
        },
    });
    return response.data;
};

export { addTeam };
