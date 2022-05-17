import React from "react";
import { render, screen } from "@testing-library/react";
import { ViewRequirements } from "./viewRequirements";

describe("ViewRequirements tests", () => {
    beforeEach(() => {
        render(<ViewRequirements requiredCourses={[]} takenCourses={[]} />);
    });

    test("There is a Table", () => {
        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();
    });

    test("There is a course in the table", () => {
        const course = screen.getByText("Course");
        expect(course).toBeInTheDocument();
    });
});
