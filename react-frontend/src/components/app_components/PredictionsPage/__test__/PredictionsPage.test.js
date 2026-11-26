import React from "react";
import { render, screen } from "@testing-library/react";

import PredictionsPage from "../PredictionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders predictions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PredictionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("predictions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("predictions-add-button")).toBeInTheDocument();
});
