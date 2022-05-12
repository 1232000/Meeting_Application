import axios from "axios";
import config from "../config";
import { getToken } from "./auth";

const BASE_URL = config.BASE_URL;

const addAttendeeMeetings = async (email, meetingId) => {
    const url = `${BASE_URL}/meetings/${meetingId}?action=add_attendee&email=${email}`;
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

export default addAttendeeMeetings;
