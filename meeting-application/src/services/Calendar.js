import axios from "axios";
import config from "../config";
import { getToken } from "../services/auth";

const getMeetings = async (date) => {
    const response = await axios.get(
        `${config.BASE_URL}/calendar?date=${date}`,
        {
            headers: {
                Authorization: getToken(),
            },
        }
    );

    return response.data;
};

export { getMeetings };
