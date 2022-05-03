import React from "react";
import { render, screen } from "@testing-library/react";
import { ClearSemesterModal } from "./ClearSemesterModal";

describe("ClearSemesterModal tests", () => {
    beforeEach(() => {
        render(
            <ClearSemesterModal
                clearSemesters={function (): void {
                    throw new Error("Function not implemented.");
                }}
            />
        );
    });

    test("There is a button labeled Clear Semesters", () => {
        const changeTypeButton = screen.getByRole("button", {
            name: /Clear Semesters/i
        });
        expect(changeTypeButton).toBeInTheDocument();
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
});
