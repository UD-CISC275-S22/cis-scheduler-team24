import React from "react";
import { render, screen } from "@testing-library/react";
import { ListCourses } from "./listCourses";

describe("listCourses", () => {
    render(
        <ListCourses
            courses={[]}
            semesterCourses={[]}
            floatingCourses={[]}
            requiredCourses={[]}
            takenCourses={[]}
            planID={0}
            semesterID={0}
            removeCourse={() => []}
            addCourse={() => []}
            setRequiredCourses={() => []}
            setSemesterCourses={() => []}
        />
    );
    test("test the button", () => {
        const savebutton = screen.getByRole("button", { name: /Add Course/i });
        savebutton.click();
    });
});
