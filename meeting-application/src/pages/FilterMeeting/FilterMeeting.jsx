import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../../global/AppNavbar";
import { Container, Row, Col, Nav, Button, Alert } from "react-bootstrap";
import "../../all.scss";
import axios from "axios";
import config from "../../config";
import { getToken } from "../../services/auth";
import { getUsers } from "../../services/GetMembers";
import excuseYourself from "../../services/ExcuseYourselfMeeting";
import addAttendeeMeetings from "../../services/AddMemberMeeting";
import {Helmet} from "react-helmet";

const FilterMeeting = () => {
    const [meetings, setMeetings] = useState([]);
    const [day, setDay] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("LOADING");
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [attendeeEmail, setAttendeeEmail] = useState("");

    const meetingFetch = async () => {
        const response = await axios.get(
            `${config.BASE_URL}/meetings?period=${day}&search=${desc}`,
            {
                headers: {
                    Authorization: getToken(),
                },
            }
        );
        return response.data;
    };

    const searchMeeting = async () => {
        try {
            const response = await meetingFetch();
            const meetingResponse = response;
            setStatus("LOADED");
            setMeetings(meetingResponse);
        } catch (error) {
            setStatus("ERROR");
            setError(error.message);
        }
    };

    const membersfetch = async () => {
        try {
            const response = await getUsers();
            const membersresponse = response;
            setUsers(membersresponse);
        } catch (error) {}
    };
    useEffect(() => {
        membersfetch();
    }, []);

    const removeMeetHandler = async (meeting) => {
        await excuseYourself(meeting);
        setMeetings(meetings.filter((item) => item._id !== meeting._id));
    };

    const addNewAttendee = async (meeting) => {
        const newAttendeeResponse = await addAttendeeMeetings(
            attendeeEmail,
            meeting._id
        );
        const newMeetings = meetings.map((item) => {
            if (item._id === meeting._id) {
                return newAttendeeResponse;
            }
            return item;
        });
        setMeetings(newMeetings);
    };

    const showMeetings = meetings.map((meetingInfo) => {
        let attendeesString = "";
        meetingInfo.attendees.forEach((attendee) => {
            attendeesString += attendee.email + ", ";
        });
        return (
            <Row
                key={meetingInfo._id}
                title={`MeetingID - ${meetingInfo.name}`}
                data-testid={meetingInfo._id}
                className="block-example border border-dark p-3 my-2 rounded-3">
                <Row className="emphasize date">
                    {meetingInfo.date.substr(0, 10)}
                </Row>
                <Row>
                    {meetingInfo.startTime.hours}:
                    {meetingInfo.startTime.minutes} -{" "}
                    {meetingInfo.endTime.hours}:{meetingInfo.endTime.minutes}
                </Row>
                <Row className="emphasize">{meetingInfo.name}</Row>
                <Row
                    className="emphasize mb-2"
                    dangerouslySetInnerHTML={{
                        __html: meetingInfo.description,
                    }}></Row>
                <Button
                    className="btn-danger col-xs-2 col-md-3 col-lg-2 mb-3"
                    role="button"
                    onClick={() => removeMeetHandler(meetingInfo)}>
                    Excuse Yourself
                </Button>
                <Row>
                    <hr />
                    <span className="emphasize" aria-label="Members:">
                        Members: {attendeesString}
                    </span>
                </Row>
                <Row>
                    <Row className="col-xs-12 col-lg-5">
                        <select
                            class="mdb-select md-form my-1 p-2 col-xs-1 option-position"
                            onChange={(event) => {
                                setAttendeeEmail(event.target.value);
                            }}>
                            {users.map((member) => (
                                <option
                                    value={member.email}
                                    key={member._id}
                                    class="option-position">
                                    {" "}
                                    {member.email}
                                </option>
                            ))}
                        </select>
                    </Row>
                    <Row className="my-3">
                        <Button
                            className=" col-4 col-xs-2 col-lg-2"
                            role="button"
                            onClick={() => addNewAttendee(meetingInfo)}>
                            Add
                        </Button>
                    </Row>
                </Row>
            </Row>
        );
    });

    return (
            
        <div>
            <Helmet>
                <title>Filter/Search Meeting</title>
                <meta name="description" content="Users can search for their meetings according to period or description" />
            </Helmet>
            <AppNavbar />
            <Container className="my-5">
                <Row>
                    <Col>
                        <h1>Filter Meeting</h1>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Nav>
                        <Nav.Link as={Link} to="/FilterMeeting">
                            Filter Meetings
                        </Nav.Link>
                        <Nav.Link as={Link} to="/AddMeeting">
                            Add Meetings
                        </Nav.Link>
                    </Nav>
                </Row>
            </Container>
            <Container className="bg-info rounded-3 my-5">
                <Row className="p-3">
                    <h1 className="color-white">Search for meetings</h1>
                    <hr />
                </Row>
                <Row className="p-3">
                    <span className="emphasize">Date</span>
                    <select
                        className="p-2 rounded-3"
                        searchable="Search here.."
                        value={day}
                        onChange={(event) => setDay(event.target.value)}>
                        <option value="All" aria-label="All">All</option>
                        <option value="Past" aria-label="Past">Past</option>
                        <option value="Present" aria-label="Present">Present</option>
                        <option value="Future" aria-label="Future">Future</option>
                    </select>
                </Row>
                <Row className="p-3">
                    <label for="search-description" className="emphasize" aria-label="Search For:">Search For:</label>
                    <textarea
                        id="search-description"
                        rows={4}
                        cols={4}
                        className="width-input rounded-3"
                        value={desc}
                        onChange={(event) => setDesc(event.target.value)}
                    />
                    <p className="py-1 emphasize">
                        Add description of the meeting
                    </p>
                </Row>
                <Row className="px-3 mb-3">
                    <Button
                        className="col-xs-2 col-md-3 col-lg-2 mb-3"
                        role="button"
                        onClick={searchMeeting}>
                        Search
                    </Button>
                </Row>
            </Container>
            <Container>
                {status === "LOADED" && (
                    <div>
                        <h2 className="my-3">
                            Meeting matching search criteria
                        </h2>
                        <div>{showMeetings}</div>
                    </div>
                )}
                {status === "ERROR" && <Alert variant="danger">{error}</Alert>}
            </Container>
        </div>
    );
};

export default FilterMeeting;
