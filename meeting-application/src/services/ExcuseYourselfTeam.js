import axios from "axios";
import config from "../config";
import { getToken } from "./auth";

const BASE_URL = config.BASE_URL;

const excuseYourself = async (team) => {
    const url = `${BASE_URL}/teams/${team._id}?action=remove_member`;
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

export default excuseYourself;
