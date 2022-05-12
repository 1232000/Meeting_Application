import AddMeeting from "./AddMeeting";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import store from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("AddMeeting form on submit", () => {
    const newMeeting = {
        name: "TypeScript",
        date: "2022-03-31",
        description: "TypeScript meeting",
        startTime: {
            hours: 14,
            minutes: 15,
        },
        endTime: {
            hours: 16,
            minutes: 15,
        },
        attendees: ["anup@sapient.com"],
    };

    let nameInput, dateInput, descriptionInput, submitButton;

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AddMeeting />
                </BrowserRouter>
            </Provider>
        );

        nameInput = screen.getByLabelText(/Name of Meeting/i);
        dateInput = screen.getByLabelText(/Date/i);
        descriptionInput = screen.getByLabelText(/Description/i);

        submitButton = screen.getByRole("button", { name: /Add Meeting/i });
        userEvent.clear(nameInput);
        userEvent.clear(dateInput);
        userEvent.clear(descriptionInput);
    });

    const fillAndSubmit = (meeting) => {
        userEvent.type(nameInput, meeting.name);
        userEvent.type(dateInput, meeting.date);
        userEvent.type(descriptionInput, meeting.description);

        userEvent.click(submitButton);
    };

    test("should display error when name is not filled", async () => {
        fillAndSubmit({
            ...newMeeting,
            name: "",
        });

        const errorMessageEl = await screen.findByText(/Name is required/i);
        expect(errorMessageEl).toBeInTheDocument();
    });

    test("should display error when description is not filled", async () => {
        fillAndSubmit({
            ...newMeeting,
            description: "",
        });

        const errorMessageEl = await screen.findByText(
            /Description is required/i
        );
        expect(errorMessageEl).toBeInTheDocument();
    });

    test("should display error when startDate is not filled", async () => {
        fillAndSubmit({
            ...newMeeting,
            date: "",
        });

        const errorMessageEl = await screen.findByText(/Date is required/i);
        expect(errorMessageEl).toBeInTheDocument();
    });
});
