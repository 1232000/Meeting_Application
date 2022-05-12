import Team from "./Team";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";

test("should show a loading message when it start up", () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Team />
            </BrowserRouter>
        </Provider>
    );

    const loadingMessage = screen.getByRole("alert", {
        name: "We are fetching teams. Hang on.",
    });
    expect(loadingMessage).toHaveTextContent("We are fetching teams. Hang on.");
});

test("should fetch and load the initial set of teams from the server", async () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Team />
            </BrowserRouter>
        </Provider>
    );

    const Team1El = await screen.findByText("Team spreading awareness about Agile practices at Zwiggy");
    expect(Team1El).toBeInTheDocument();

    const Team2El = await screen.findByText("Final Demo");
    expect(Team2El).toBeInTheDocument();

    const loadingMessage = screen.queryByRole("alert", {
        name: "We are fetching teams. Hang on.",
    });
    expect(loadingMessage).not.toBeInTheDocument();
});
