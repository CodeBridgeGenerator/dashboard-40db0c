import React from "react";
import { render, screen } from "@testing-library/react";

import ParametersPage from "../ParametersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders parameters page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ParametersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("parameters-datatable")).toBeInTheDocument();
    expect(screen.getByRole("parameters-add-button")).toBeInTheDocument();
});
