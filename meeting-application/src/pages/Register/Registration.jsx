import React,{useState} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { register as registerAuth } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Helmet} from "react-helmet";
import { FaExclamationCircle } from "react-icons/fa";
import "../../all.scss";
const Registration = () => {
    const [error, setError]=useState(null);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        mode: "all",
    });

    const navigate = useNavigate();

    const validatePassword = () => {
        const pass = getValues("password");
        const cnfPass = getValues("cnfPassword");
        return pass === cnfPass;
    };

    const signup = async (credentials) => {
        try {
            await registerAuth(credentials);
            navigate("/");
        } catch (error) {
            setError(error);
            // alert(error.message);
        }
    };
    return (
        <>
            <div className="index-page">
            <Helmet>
                <title>Register Page</title>
                <meta name="description" content="This Page allows users to register for the meetings app" />
            </Helmet>
                <div class="p-3 mb-2">
                    <Container>
                        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded bg-light">
                            Registration Page
                        </h1>
                        <Row className="mt-5 bg-light">
                            <Col
                                lg={5}
                                md={6}
                                sm={12}
                                className="padding-signup m-auto shadow-sm rounded-lg">
                                <Form onSubmit={handleSubmit(signup)}>
                                    <Form.Group>
                                        <Form.Label className="emphasize required">
                                            Name
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-4"
                                            type="text"
                                            placeholder="Enter Name"
                                            controlId="name"
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                        <div className="formError emphasize">
                                            {errors.name &&
                                                errors.name.type ===
                                                    "required" && (
                                                    <div
                                                        role="alert"
                                                        aria-label="Name required">
                                                        <i className="classes you have">
                                                            <FaExclamationCircle />{" "}
                                                        </i>
                                                        &nbsp; Name is required
                                                    </div>
                                                )}
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label controlId="email" className="required">
                                            <span className="emphasize">
                                                Email address
                                            </span>
                                            <br />
                                            (Format :
                                            sapient.com/publicissapient.com)
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-4"
                                            type="email"
                                            placeholder="Enter email"
                                            {...register("email", {
                                                required: true,
                                                pattern:
                                                    /^[A-Za-z]{1}[A-Za-z0-9]+@(publicissapient|sapient).com$/,
                                            })}
                                        />
                                        <div className="formError emphasize">
                                            {errors.email &&
                                                errors.email.type ===
                                                    "required" && (
                                                    <div
                                                        role="alert"
                                                        aria-label="Email required">
                                                        <i className="classes you have">
                                                            <FaExclamationCircle />{" "}
                                                        </i>
                                                        &nbsp; Email is required
                                                    </div>
                                                )}
                                            {errors.email &&
                                                errors.email.type ===
                                                    "pattern" && (
                                                    <div>
                                                        <div
                                                            role="alert"
                                                            aria-label="Email format is incorrect">
                                                            <i className="classes you have">
                                                                <FaExclamationCircle />{" "}
                                                            </i>
                                                            &nbsp; Email format
                                                            is incorrect
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label controlId="password">
                                            <span className="emphasize required">
                                                Password
                                            </span>
                                            <br />
                                            (Combination of at least 8 letters,
                                            numbers, special characters)
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-4"
                                            type="password"
                                            placeholder="Password"
                                            {...register("password", {
                                                required: true,
                                                pattern:
                                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                            })}
                                        />
                                        <div className="formError emphasize">
                                            {errors.password &&
                                                errors.password.type ===
                                                    "required" && (
                                                    <div
                                                        role="alert"
                                                        aria-label="Password required">
                                                        <i className="classes you have">
                                                            <FaExclamationCircle />{" "}
                                                        </i>
                                                        &nbsp; Password is
                                                        required
                                                    </div>
                                                )}
                                            {errors.password &&
                                                errors.password.type ===
                                                    "pattern" && (
                                                    <div>
                                                        <div
                                                            role="alert"
                                                            aria-label="Invalid Password Format">
                                                            <i className="classes you have">
                                                                <FaExclamationCircle />{" "}
                                                            </i>
                                                            &nbsp; Invalid
                                                            Password Format
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label
                                            controlId="cnfPassword"
                                            className="emphasize required">
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-4"
                                            type="password"
                                            placeholder="Confirm Password"
                                            {...register("cnfPassword", {
                                                required: true,
                                                validate: validatePassword,
                                            })}
                                        />
                                        <div className="formError emphasize">
                                            {errors.cnfPassword &&
                                                errors.cnfPassword.type ===
                                                    "required" && (
                                                    <div
                                                        role="alert"
                                                        aria-label="Confirm Password required">
                                                        <i className="classes you have">
                                                            <FaExclamationCircle />{" "}
                                                        </i>
                                                        &nbsp; Confirm Password
                                                        is required
                                                    </div>
                                                )}
                                            {errors.cnfPassword &&
                                                errors.cnfPassword.type ===
                                                    "validate" && (
                                                    <div
                                                        role="alert"
                                                        aria-label="Password and Confirm Password doesn't match">
                                                        {" "}
                                                        <i className="classes you have">
                                                            <FaExclamationCircle />{" "}
                                                        </i>
                                                        &nbsp; Password and
                                                        Confirm Password doesn't
                                                        match
                                                    </div>
                                                )}
                                        </div>
                                        {error && error.response.status===409 && (
                                            <div className="error-color emphasize">
                                                <i className="classes you have">
                                                                <FaExclamationCircle />{" "}
                                                            </i>
                                                            &nbsp;
                                            User already exists.
                                            </div>
                                            )}
                                    </Form.Group>
                                    <Row xs={1}>
                                        <Col>
                                            <Button
                                                variant="primary btn-block"
                                                type="submit"
                                                className="btn-width">
                                                Register
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                variant="danger btn-block"
                                                type="reset"
                                                className="btn-width">
                                                Reset
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Registration;
