import { AddTeam } from "./AddTeam";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";

describe("AddTeam form on submit", () => {
    const newTeam = {
        name: "TypeScript",
        shortName: "typescript",
        description: "TypeScript team",
    };

    let nameInput, shortNameInput, descriptionInput, submitButton;

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AddTeam />
                </BrowserRouter>
            </Provider>
        );

        nameInput = screen.getByLabelText(/Team Name/i);
        shortNameInput = screen.getByLabelText(/Short Name/i);
        descriptionInput = screen.getByLabelText(/Description/i);

        submitButton = screen.getByRole("button", { name: /Add Team/i });

        userEvent.clear(nameInput);
        userEvent.clear(shortNameInput);
        userEvent.clear(descriptionInput);
    });

    const fillAndSubmit = (team) => {
        userEvent.type(nameInput, team.name);
        userEvent.type(shortNameInput, team.shortName);
        userEvent.type(descriptionInput, team.description);

        userEvent.click(submitButton);
    };

    test("should display error when name is not filled", async () => {
        fillAndSubmit({
            ...newTeam,
            name: "",
        });

        const errorMessageEl = await screen.findByText(
            /Team's name is required/i
        );
        expect(errorMessageEl).toBeInTheDocument();
    });

    test("should display error when shortName is not filled", async () => {
        fillAndSubmit({
            ...newTeam,
            shortName: "",
        });

        const errorMessageEl = await screen.findByText(
            /Team's short name is required/i
        );
        expect(errorMessageEl).toBeInTheDocument();
    });

    test("should display error when description is not filled", async () => {
        fillAndSubmit({
            ...newTeam,
            description: "",
        });

        const errorMessageEl = await screen.findByText(
            /Description is required/i
        );
        expect(errorMessageEl).toBeInTheDocument();
    });
});

test("should add a new team id inputs are valid", async () => {
    render(<AddTeam />);

    const nameInput = screen.getByLabelText(/Team Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const shortNameInput = screen.getByLabelText(/Short Name/i);

    const submitButton = screen.getByRole("button", { name: /Add Team/i });

    const newteam = {
        name: "TypeScript",
        shortName: "typescript",
        description: "TypeScript team",
    };

    // as a good practice we make sure the inputs do not have anything entered from previous test code in this test
    userEvent.clear(nameInput);
    userEvent.clear(descriptionInput);
    userEvent.clear(shortNameInput);

    userEvent.type(nameInput, newteam.name);
    userEvent.type(descriptionInput, newteam.description);
    userEvent.type(shortNameInput, newteam.shortName);

    userEvent.click(submitButton);

    const toastSuccessBodyEl = await screen.findByText(/Team with name/i);
    expect(toastSuccessBodyEl).toBeInTheDocument();
});

// test("should add a new team", async () => {
//     render(
//         <Provider store={store}>
//             <BrowserRouter>
//                 <AddTeam />
//             </BrowserRouter>
//         </Provider>
//     );

//     const nameInput = await screen.findByLabelText(/Team Name/);
//     const shortNameInput = await screen.findByLabelText(/Short Name/i); // we can use regular exp also
//     const descriptionInput = await screen.findByLabelText(/Description/);
//     const addTeamButton = await screen.findByRole("button", {
//         name: "Add Team",
//     }); // we can use regular exp also

//     const newTeam = {
//         name: "TypeScript",
//         shortName: "typescript",
//         description: "TypeScript team",
//     };

//     // as a good practice we make sure the inputs do not have anything entered from previous test code in this test
//     userEvent.clear(nameInput);
//     userEvent.clear(shortNameInput);
//     userEvent.clear(descriptionInput);

//     userEvent.type(nameInput, newTeam.name);
//     userEvent.type(shortNameInput, newTeam.shortName);
//     userEvent.type(descriptionInput, newTeam.description);

//     userEvent.click(addTeamButton);

//     const newContactEl = await screen.findByText("TypeScript team");
//     expect(newContactEl).toBeInTheDocument();

//     expect(nameInput.value).toEqual("");
//     expect(shortNameInput.value).toEqual("");
//     expect(descriptionInput.value).toEqual("");
// });
