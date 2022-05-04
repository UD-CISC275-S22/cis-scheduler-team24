import React from "react";
import { render, screen } from "@testing-library/react";
import { ViewRequirements } from "./viewRequirements";
import { Course } from "../interfaces/course";
import courses from "../data/course–book.json";

const COURSES = courses.map(
    (course): Course => ({
        ...course,
        prerequisites: course.prerequisites.map(Number)
    })
);

const REQUIREMENTS = COURSES.filter(
    (course: Course): boolean => course.isRequired
);

describe("ViewPlan tests", () => {
    beforeEach(() => {
        render(<ViewRequirements requirements={REQUIREMENTS} />);
    });

    test("There is a Table", () => {
        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();
    });
    test("There is a course in the table", () => {
        const course = screen.getByText(
            "CISC108: Introduction to Computer Science I"
        );
        expect(course).toBeInTheDocument();
    });
});
