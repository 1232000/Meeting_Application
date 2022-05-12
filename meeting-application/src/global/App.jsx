import React from "react";
import Login from "../pages/Login/Login";
import Registration from "../pages/Register/Registration";
import Calendar from "../pages/Calendar/Calendar";
import AddMeeting from "../pages/AddMeeting/AddMeeting";
import FilterMeeting from "../pages/FilterMeeting/FilterMeeting";
import Team from "../pages/Team/Team";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/Registration" element={<Registration />} />

                <Route
                    path="/Calendar"
                    element={
                        <RequireAuth>
                            {" "}
                            <Calendar />{" "}
                        </RequireAuth>
                    }
                />

                <Route
                    path="/AddMeeting"
                    element={
                        <RequireAuth>
                            {" "}
                            <AddMeeting />{" "}
                        </RequireAuth>
                    }
                />

                <Route
                    path="/FilterMeeting"
                    element={
                        <RequireAuth>
                            {" "}
                            <FilterMeeting />{" "}
                        </RequireAuth>
                    }
                />

                <Route
                    path="/Team"
                    element={
                        <RequireAuth>
                            {" "}
                            <Team />{" "}
                        </RequireAuth>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
