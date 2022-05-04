import React from "react";
import { render, screen } from "@testing-library/react";
import { DeleteCourseModal } from "./DeleteCourseModal";
import { cleanup } from "@testing-library/react";

describe("DeleteCourseModal tests", () => {
    beforeEach(() => {
        render(<DeleteCourseModal deletCourse={() => []} />);
    });

    afterEach(cleanup);

    test("There is a button labeled Delete All Course", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /Delete All Course/i
        });
        expect(DeleteButton).toBeInTheDocument();
    });

    test("Clicking Delete All Course button show the warning modal", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /Delete All Course/i
        });
        DeleteButton.click();
        const answerText = screen.queryByText(/⚠️/);
        expect(answerText).toBeInTheDocument();
    });

    test("Clicking Clear Semesters button show a button labeled Cancel", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /Delete All Course/i
        });
        DeleteButton.click();
        const CancelButton = screen.getByRole("button", {
            name: /Cancel/i
        });
        expect(CancelButton).toBeInTheDocument();
    });

    test("Clicking Cancel button close the the warning modal", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /Delete All Course/i
        });
        DeleteButton.click();
        const CancelButton = screen.getByRole("button", {
            name: /Cancel/i
        });
        CancelButton.click();
        const answerText = screen.queryByText(/⚠️/);
        expect(answerText).toBeInTheDocument();
    });

    test("Clicking Clear Semesters button show a button labeled Delete All Courses", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /Delete All Course/i
        });
        DeleteButton.click();
        const DeleteAllButton = screen.getByRole("button", {
            name: /Delete All Courses/i
        });
        DeleteAllButton.click();
        expect(DeleteAllButton).toBeInTheDocument();
    });

    test("Clicking Clear Semesters button and Clicking a button labeled Delete All Courses", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /Delete All Course/i
        });
        DeleteButton.click();
        const DeleteAllButton = screen.getByRole("button", {
            name: /Delete All Courses/i
        });
        DeleteAllButton.click();
        expect(DeleteAllButton).toBeEnabled();
    });
});
