import axios from "axios";
import config from "../config";
import { getToken } from "./auth";

const BASE_URL = config.BASE_URL;

const addMembersTeam = async (email, teamId) => {
    const url = `${BASE_URL}/teams/${teamId}?action=add_member&email=${email}`;
    try {
        const response = await axios.patch(url, null, {
            headers: {
                Authorization: getToken(),
            },
        });
        return response.data;
    } catch (error) {
        alert(error.message);
    }
};

export default addMembersTeam;
