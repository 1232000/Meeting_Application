import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../../global/AppNavbar";
import { Container, Row, Col, Nav, Button, Alert, Form } from "react-bootstrap";
import { addMeeting } from "../../services/AddMeeting";
import { useForm } from "react-hook-form";
import {Helmet} from "react-helmet";
import { FaExclamationCircle } from "react-icons/fa";
import "../../all.scss";


const hours = [...Array(24).keys()];
const mins = [...Array(60).keys()];
const AddMeeting = () => {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        mode: "all",
    });

    const validateDate = () => {
        const date = new Date(getValues("date"));
        const currentDate = new Date();
        return date.getTime() - currentDate.getTime() >= 0;
    };

    const validateTimeHours = () => {
        const startTimeHours = parseInt(getValues("startTime.hours"));
        const endTimeHours = parseInt(getValues("endTime.hours"));
        return endTimeHours - startTimeHours >= 0;
    };

    const validateTimeMins = () => {
        const startTimeHours = getValues("startTime.hours");
        const endTimeHours = getValues("endTime.hours");
        const startTimeMins = getValues("startTime.minutes");
        const endTimeMins = getValues("endTime.minutes");
        if (endTimeHours === startTimeHours) {
            return endTimeMins - startTimeMins >= 0;
        } else {
            return true;
        }
    };

    const newMeeting = async (meeting) => {
        const meeting1 = {
            name: meeting.name,
            date: meeting.date,
            description: meeting.description,
            startTime: {
                hours: parseInt(meeting.startTime.hours),
                minutes: parseInt(meeting.startTime.minutes),
            },
            endTime: {
                hours: parseInt(meeting.endTime.hours),
                minutes: parseInt(meeting.endTime.minutes),
            },
            attendees: meeting.attendees.split(","),
        };

        try {
            const response = await addMeeting(meeting1);
            const newMeetingResponse = response;
            setStatus("ADDED");
            setError(
                `Meeting with name = ${newMeetingResponse.name} has been added`
            );
            reset();
        } catch (error) {
            setStatus("ERROR");
            setError(error.message);
        }
    };
    return (
        <div>
            <Helmet>
                <title>Add Meetings</title>
                <meta name="description" content="This page allows users to add new meetings" />
            </Helmet>
            <AppNavbar />
            <Container className="my-5 overflow">
                <Row>
                    <Col>
                        <h1>Add Meeting</h1>
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
            <Container className="bg-info rounded-3 overflow">
                <Form onSubmit={handleSubmit(newMeeting)}>
                    <Row className="p-3">
                        <h1 class="color-white">Add a new meeting</h1>
                        <hr />
                    </Row>
                    <Form.Group className="p-3" controlId="name">
                        <Form.Label className="emphasize required">
                            Name of meeting
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            class="rounded-3 p-1"
                            {...register("name", { required: true })}
                        />
                        <div className="formError emphasize">
                            {errors.name && errors.name.type === "required" && (
                                <div role="alert" aria-label="name required">
                                    <i className="classes you have">
                                        <FaExclamationCircle />{" "}
                                    </i>
                                    &nbsp; Name is required
                                </div>
                            )}
                        </div>
                    </Form.Group>
                    <Form.Group className="p-3" controlId="date">
                        <Form.Label className="emphasize required">Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            class="rounded-3 p-1"
                            {...register("date", {
                                required: true,
                                validate: validateDate,
                            })}
                        />
                        <div className="formError emphasize">
                            {errors.date && errors.date.type === "required" && (
                                <div role="alert" aria-label="date required">
                                    <i className="classes you have">
                                        <FaExclamationCircle />{" "}
                                    </i>
                                    &nbsp; Date is required
                                </div>
                            )}
                            {errors.date && errors.date.type === "validate" && (
                                <div
                                    role="alert"
                                    aria-label="Date should be on or after current date">
                                    {" "}
                                    <i className="classes you have">
                                        <FaExclamationCircle />{" "}
                                    </i>
                                    &nbsp; Date should be on or after current
                                    date
                                </div>
                            )}
                        </div>
                    </Form.Group>
                    <Form.Group className="p-3" controlId="startTime">
                        <Form.Label class="emphasize">
                            Start time (hh:mm)
                        </Form.Label>
                        <div class="add-meeting-background">
                            <select
                                name="hour-time"
                                class="px-2 py-1 rounded-3"
                                required
                                {...register("startTime.hours")}>
                                {hours.map((hour) => (
                                    <option key={`startHour-${hour}`}>{hour}</option>
                                ))}
                            </select>
                            <b>:</b>
                            <select
                                name="minute-time"
                                class="px-2 py-1 rounded-3"
                                {...register("startTime.minutes")}>
                                {mins.map((min) => (
                                    <option key={`startMin-${min}`}>{min}</option>
                                ))}
                            </select>
                        </div>
                    </Form.Group>
                    <Form.Group className="p-3" controlId="endTime">
                        <Form.Label class="emphasize required">
                            End time (hh:mm)
                        </Form.Label>
                        <div class="add-meeting-background">
                            <select
                                name="hour-time"
                                class="px-2 py-1 rounded-3"
                                required
                                {...register("endTime.hours", {
                                    validate: validateTimeHours,
                                })}>
                                {hours.map((hour) => (
                                    <option key={`endHour-${hour}`}>{hour}</option>
                                ))}
                            </select>
                            <b>:</b>
                            <select
                                name="minute-time"
                                class="px-2 py-1 rounded-3"
                                {...register("endTime.minutes", {
                                    validate: validateTimeMins,
                                })}>
                                {mins.map((min) => (
                                    <option key={`endMin-${min}`}>{min}</option>
                                ))}
                            </select>
                        </div>
                        <div className="formError emphasize">
                            {errors &&
                                errors.endTime &&
                                errors.endTime.hours &&
                                errors.endTime.hours.type === "validate" && (
                                    <div
                                        role="alert"
                                        aria-label="End Time can't be less than Start Time">
                                        <i className="classes you have">
                                            <FaExclamationCircle />{" "}
                                        </i>
                                        &nbsp; End Time can't be less than Start
                                        Time
                                    </div>
                                )}
                                
                            {errors &&
                                errors.endTime &&
                                errors.endTime.minutes &&
                                errors.endTime.minutes.type === "validate" && (
                                    <div
                                        role="alert"
                                        aria-label="End Time Mins can't be less than Start Time Mins">
                                        <i className="classes you have">
                                            <FaExclamationCircle />{" "}
                                        </i>
                                        &nbsp; End Time can't be less than Start
                                        Time
                                    </div>
                                )}
                        </div>
                    </Form.Group>
                    <Form.Group className="p-3" controlId="description">
                        <Form.Label className="emphasize required">
                            Description
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            class="rounded-3 p-1"
                            {...register("description", {
                                required: true,
                                minLength: 10,
                            })}
                        />
                        <div className="formError emphasize">
                            {errors.description &&
                                errors.description.type === "required" && (
                                    <div>
                                        <i className="classes you have">
                                            <FaExclamationCircle />{" "}
                                        </i>
                                        &nbsp;Description is required
                                    </div>
                                )}
                            {errors.description &&
                                errors.description.type === "minLength" && (
                                    <div>
                                        <i className="classes you have">
                                            <FaExclamationCircle />{" "}
                                        </i>
                                        &nbsp; Description should be minimum 10
                                        characters
                                    </div>
                                )}
                        </div>
                    </Form.Group>
                    <Form.Group className="p-3" controlId="email-id">
                        <Form.Label className="emphasize">
                            Email IDs of attendees, or team's short
                        </Form.Label>
                        <Form.Control
                            type="email"
                            name="email-id"
                            placeholder="john@example.com,@annual-day,mark@sapient.com"
                            multiple
                            class="rounded-3 p-1"
                            {...register("attendees")}
                        />
                        <span className="emphasize">
                            Separate email id's/team short names by commas -
                            team short names always begin with @
                        </span>
                    </Form.Group>

                    <Button
                        className="col-xs-2 col-md-3 col-lg-2 mb-3 "
                        type="submit">
                        Add Meeting
                    </Button>

                    {status === "ADDED" && (
                        <Alert variant="primary">{error}</Alert>
                    )}
                    {status === "ERROR" && (
                        <Alert variant="danger">{error}</Alert>
                    )}
                </Form>
            </Container>
        </div>
    );
};
export default AddMeeting;
