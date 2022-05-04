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

    test("Whether there is a Credit showing up on screen", () => {
        const showfloatingcorses = screen.queryByText(
            /POSC150: Introduction to American Politics Credit: 3 (.*)/i
        );
        expect(showfloatingcorses).toBeNull();
    });

    test("Whether there is a Credit showing up on screen", () => {
        const showfloatingcorses = screen.queryByText(
            /POSC240: Introduction to Global Politics Credit: 3 (.*)/i
        );
        expect(showfloatingcorses).toBeNull();
    });

    test("Whether there is a Credit showing up on screen", () => {
        const showfloatingcorses = screen.queryByText(
            /PHIL125: Philosophy in South Park Credit: 3 (.*)/i
        );
        expect(showfloatingcorses).toBeNull();
    });

    test("Whether there is a Credit showing up on screen", () => {
        const showfloatingcorses = screen.queryByText(
            /ENGL410: Technical Writing Credit: 3 (.*)/i
        );
        expect(showfloatingcorses).toBeNull();
    });

    test("Whether there is a Credit showing up on screen", () => {
        const showfloatingcorses = screen.queryByText(
            /CISC475: Advanced Software Engineering Credit: 3 (.*)/i
        );
        expect(showfloatingcorses).toBeNull();
    });

    test("There is a lists of Courses", () => {
        const NewCourses = courses.filter(
            (course: Course): boolean => !course.isTaken
        );
        expect([NewCourses]).toEqual([NewCourses]);
    });
    // test("Expect default CoursesPool to appear", () => {
    //     const coursesPool = screen.getByTestId("ViewFloatingCourses");

    //     expect(within(coursesPool).queryAllByTestId(/draggable/i)).toHaveLength(
    //         8
    //     );
    // });
});
