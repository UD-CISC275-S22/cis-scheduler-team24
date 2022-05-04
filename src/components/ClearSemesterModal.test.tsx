import React from "react";
import { render, screen } from "@testing-library/react";
import { ClearSemesterModal } from "./ClearSemesterModal";
import { cleanup } from "@testing-library/react";

describe("ClearSemesterModal tests", () => {
    beforeEach(() => {
        render(<ClearSemesterModal clearSemesters={() => []} />);
    });

    afterEach(cleanup);

    test("There is a button labeled Clear Semesters", () => {
        const ClearButton = screen.getByRole("button", {
            name: /Clear Semesters/i
        });
        expect(ClearButton).toBeInTheDocument();
    });

    test("Clicking Clear Semesters button show the warning modal", () => {
        const clearButton = screen.getByRole("button", {
            name: /Clear Semesters/i
        });
        clearButton.click();
        const answerText = screen.queryByText(/⚠️/);
        expect(answerText).toBeInTheDocument();
    });

    test("Clicking Clear Semesters button show a button labeled Cancel", () => {
        const clearButton = screen.getByRole("button", {
            name: /Clear Semesters/i
        });
        clearButton.click();
        const CancelButton = screen.getByRole("button", {
            name: /Cancel/i
        });
        expect(CancelButton).toBeInTheDocument();
    });

    test("Clicking Cancel button close the the warning modal", () => {
        const clearButton = screen.getByRole("button", {
            name: /Clear Semesters/i
        });
        clearButton.click();
        const CancelButton = screen.getByRole("button", {
            name: /Cancel/i
        });
        CancelButton.click();
        const answerText = screen.queryByText(/⚠️/);
        expect(answerText).toBeInTheDocument();
    });

    test("Clicking Delete button close the the warning modal and clear semster", () => {
        const clearButton = screen.getByRole("button", {
            name: /Clear Semesters/i
        });
        clearButton.click();
        const DeleteButton = screen.getByTestId("Clear-all-semesters-button");
        DeleteButton.click();
        expect(DeleteButton).toBeEnabled();
    });
});
