import React from "react";
import { render, screen /*, within */ } from "@testing-library/react";
import { ViewFloatingCourses } from "./viewFloatingCourses";

describe("ViewFloatingCourses", () => {
    beforeEach(() => {
        render(
            <ViewFloatingCourses
                floatingCourses={[]}
                takenCourses={[]}
                setFloats={() => []}
                setTakenCourses={() => []}
                semesters={[]}
            />
        );
    });

    test("There is a Table", () => {
        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();
    });
});
