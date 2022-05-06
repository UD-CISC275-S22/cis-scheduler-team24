import React from "react";
import { render, screen /*, within */ } from "@testing-library/react";
import { ViewFloatingCourses } from "./viewFloatingCourses";
import { Course } from "../interfaces/course";
import courses from "../data/course–book.json";
// import userEvent from "@testing-library/user-event";
// import { verticalDrag } from "react-beautiful-dnd-tester";

describe("ViewFloatingCourses", () => {
    beforeEach(() => {
        const floatingCourses = courses.filter(
            (course: Course): boolean => !course.isTaken
        );
        render(
            <ViewFloatingCourses
                floatingCourses={floatingCourses}
                setFloats={() => []}
            />
        );
    });
    test("There is a Table", () => {
        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();
    });
});
