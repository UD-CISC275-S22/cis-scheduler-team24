import React from "react";
import { render, screen } from "@testing-library/react";
import { DeleteCourseWarningModalX } from "./DeleteCourseWarningModalX";
import { cleanup } from "@testing-library/react";

describe("DeleteCourseModalX tests", () => {
    beforeEach(() => {
        render(
            <DeleteCourseWarningModalX
                removeCourse={() => []}
                planID={0}
                semesterID={0}
                course={{
                    id: 0,
                    code: "",
                    name: "",
                    credits: 0,
                    description: "",
                    prerequisites: [],
                    isEditing: false,
                    breadthType: ""
                }}
            />
        );
    });

    afterEach(cleanup);

    test("There is a button labeled Delete", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /✖️/i
        });
        expect(DeleteButton).toBeInTheDocument();
    });

    test("Clicking Delete button show the warning modal", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /✖️/i
        });
        DeleteButton.click();
        const answerText = screen.queryByText(/⚠️/);
        expect(answerText).toBeInTheDocument();
    });

    test("Clicking Clear Semesters button show a button labeled Cancel", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /✖️/i
        });
        DeleteButton.click();
        const CancelButton = screen.getByRole("button", {
            name: /✖️/i
        });
        expect(CancelButton).toBeInTheDocument();
    });

    test("Clicking Cancel button close the the warning modal", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /✖️/i
        });
        DeleteButton.click();
        const CancelButton = screen.getByRole("button", {
            name: /Cancel/i
        });
        CancelButton.click();
        const answerText = screen.queryByText(/⚠️/);
        expect(answerText).toBeInTheDocument();
    });

    test("Clicking Cancel button close the the warning modal", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /✖️/i
        });
        DeleteButton.click();
        const DeleteCourseButton = screen.getByTestId("modal-Delete-button-x");
        DeleteCourseButton.click();
        expect(DeleteCourseButton).toBeEnabled();
    });
});
