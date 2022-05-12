import React, { useState, useEffect } from "react";
import Moment from "moment";
import { Container, Row, Col } from "react-bootstrap";
import { getMeetings } from "../../services/Calendar";
import AppNavbar from "../../global/AppNavbar";
import {Helmet} from "react-helmet";
import "../../all.scss";

const Calendar = () => {
    const [status, setStatus] = useState("LOADING");
    const [meetings, setMeetings] = useState({});
    const [error, setError] = useState(null);
    const [date, setDate] = useState(Moment().format("YYYY-MM-DD"));

    const hours = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
    ];
    const month = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "June",
        6: "Jul",
        7: "Aug",
        8: "Sept",
        9: "Oct",
        10: "Nov",
        11: "Dec",
    };
    const day = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        0: "Sunday",
    };

    // const ChangeDate = (event) =>{
    //     // currDate = this.getDate();
    //     setDate (date => {
    //         return{date : event.target.value}
    //     })
    // }

    const formatDate = () => {
        const cdate = new Date(date);
        let str = "";
        str += cdate.getDate();
        str += " ";
        str += month[cdate.getMonth()];
        str += " ";
        str += cdate.getFullYear();
        return str;
    };
    const formatDay = () => {
        const cday = new Date(date);
        let str = "";
        str += day[cday.getDay()];
        return str;
    };

    const fetchMeetings = async () => {
        try {
            const calendarResponse = await getMeetings(date);

            // const calendarresponse = response.data;
            setMeetings(calendarResponse);
            setStatus("LOADED");
        } catch (error) {
            setStatus("ERROR");
            setError(error.message);
        }
    };
    useEffect(() => {
        fetchMeetings(date);
    }, []);
    useEffect(() => {
        fetchMeetings(date);
    }, [date]);

    return (
        <div>
            <Helmet>
                <title>Calendar</title>
                <meta name="description" content="Users can search for their meetings in a Calendar Format" />
            </Helmet>
            <AppNavbar />
            <Container className="my-5">
                <Row>
                    <Col>
                        <h1>Calendar</h1>
                        <hr />
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col className="col-5" align="left">
                        <h2
                            style={{ marginBottom: "3px" }}
                            className="current-date"
                            tabIndex="0">
                            <time>{formatDate()} </time>
                            <span className="current-day" tabIndex="0">
                                {formatDay()}
                            </span>
                        </h2>
                    </Col>
                    <Col className="col-7" align="right">
                        <input
                            type="date"
                            className="dates"
                            id="dob"
                            aria-label = "select date to get meetings"
                            onChange={(event) => setDate(event.target.value)}
                        />
                    </Col>
                </Row>
                <div
                    className="calendar"
                    aria-label="Represents 24 hours schedule">
                    {hours.map((hour) => (
                        <div className="hour">
                            <div className="num" key={`dayHour-${hour}`}>{hour}</div>
                            <div className="hour-box bg-info"></div>
                        </div>
                    ))}
                    {status === "LOADING" && (
                        <p role="alert" aria-label="meetings are being fetched">We are fetching meetings. Hang on.</p>
                    )}
                    <div className="meetings-parent">
                        {status === "LOADED" &&
                            meetings.map((meeting) => (
                                <div
                                    className="meeting calendar-align-left"
                                    key={meeting._id}
                                    style={{
                                        top: `${
                                            meeting.startTime.hours * 64
                                        }px`,
                                        height: `${
                                            (meeting.endTime.hours -
                                                meeting.startTime.hours) *
                                            60
                                        }px`,
                                        aria: "project kickoff",
                                    }}>
                                    <span className="meet-title">
                                        {meeting.description}
                                    </span>
                                    <hr />
                                    <span className="meet-attendees">
                                        {meeting.attendees.map((user) => (
                                            <span style={{ margin: "10px" }}>
                                                {user.email}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            ))}
                    </div>
                    {status === "ERROR" && (
                        <p style={{ color: "red" }}>{error.message}</p>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Calendar;
