import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { ViewFloatingCourses } from "./viewFloatingCourses";

describe("ViewFloatingCourses", () => {
    beforeEach(() => {
        render(
            <ViewFloatingCourses
                floatingCourses={[]}
                takenCourses={[]}
                moveFromFloatingCourses={() => []}
                semesters={[]}
                planID={0}
            />
        );
    });

    afterEach(cleanup);

    test("test the form of Floating Courses", () => {
        const Course = screen.getByText(/Course/i);
        expect(Course).toBeInTheDocument;
        const Move = screen.getByText(/Move/i);
        expect(Move).toBeInTheDocument;
    });
    //This function is simple and other test will show in other file
});
