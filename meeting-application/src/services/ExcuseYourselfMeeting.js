import axios from "axios";

import config from "../config";
import { getToken } from "./auth";

const BASE_URL = config.BASE_URL;

const excuseYourself = async (meeting) => {
    const url = `${BASE_URL}/meetings/${meeting._id}?action=remove_attendee`;
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
