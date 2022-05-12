import React, { useState, useEffect } from "react";
import AppNavbar from "../../global/AppNavbar";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { teams as getTeam } from "../../services/Team";
import { AddTeam } from "./AddTeam";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/GetMembers";
import excuseYourself from "../../services/ExcuseYourselfTeam";
import addMembersTeam from "../../services/AddMembersTeam";
import {Helmet} from "react-helmet";
import "../../all.scss";

const Team = () => {
    const [teams, setTeams] = useState([]);
    const [status, setStatus] = useState("LOADING");
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [users, setUsers] = useState([]);
    const [memberEmail, setMemberEmail] = useState("");
    const navigate = useNavigate();
    const newForm = () => {
        setShowForm(true);
    };
    const teamsfetch = async () => {
        try {
            const response = await getTeam();
            const teamsresponse = response;
            setTeams(teamsresponse);
            setStatus("LOADED");
            navigate("/Team");
        } catch (error) {
            setStatus("ERROR");
            setError(error.message);
        }
    };
    useEffect(() => {
        teamsfetch();
    }, []);

    const removeTeamHandler = (team) => {
        excuseYourself(team);
        setTeams(teams.filter((item) => item._id !== team._id));
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

    const onSetAddTeam = (newTeam) => {
        setTeams([...teams, newTeam]);
    };

    const addNewMember = async (team) => {
        const newMemberResponse = await addMembersTeam(memberEmail, team._id);
        const newTeams = teams.map((item) => {
            if (item._id === team._id) {
                return newMemberResponse;
            }
            return item;
        });

        setTeams(newTeams);
    };

    const teamsEles = teams.map((team) => {
        let membersString = "";
        team.members.forEach((member) => {
            membersString += member.email + ", ";
        });
        return (
            <Col key={team._id} xs={12} lg={4} className="d-flex p-2">
                <div className="border border-dark px-2 py-2 my-3 w-100">
                    <h2>{team.name}</h2>
                    <hr />
                    <h4>@{team.shortName}</h4>
                    <p>{team.description}</p>
                    <Button
                        className="btn-danger"
                        onClick={() => removeTeamHandler(team)}>
                        Excuse Yourself
                    </Button>
                    <hr />
                    <p className="emphasize">Members: {membersString}</p>
                    <Row className="px-2 emphasize">
                        <select
                            class="mdb-select md-form"
                            onChange={(event) => {
                                setMemberEmail(event.target.value);
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
                    <Row>
                        <Button
                            className="col-2 px-2 py-2 ms-2 mt-2"
                            onClick={() => addNewMember(team)}>
                            Add
                        </Button>
                    </Row>
                </div>
            </Col>
        );
    });

    return (
        <div>
            <Helmet>
                <title>Teams Page</title>
                <meta name="description" content="This Page allows users to view/create teams" />
            </Helmet>
            <AppNavbar />
            <Container className="my-5">
                <Row>
                    <Col>
                        <h1>Teams</h1>
                        <hr />
                    </Col>
                </Row>
                {status === "LOADING" && (
                    <Alert
                        variant="info"
                        role="alert"
                        aria-label="We are fetching teams. Hang on.">
                        We are fetching teams. Hang on.
                    </Alert>
                )}
                {status === "LOADED" && (
                    <div>
                        <Row>{teamsEles}</Row>

                        <Row>
                            <Col lg={4}>
                                {showForm === false ? (
                                    <Button
                                        className="btn-add-teams d-block w-100 bg-white"
                                        onClick={newForm}>
                                        +
                                    </Button>
                                ) : (
                                    <AddTeam setAddTeam={onSetAddTeam} />
                                )}
                            </Col>
                        </Row>
                    </div>
                )}
                {status === "ERROR" && <Alert variant="danger">{error}</Alert>}
            </Container>
        </div>
    );
};

export default Team;
