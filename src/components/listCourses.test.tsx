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
            setFloatingCourses={() => []}
            setRequiredCourses={() => []}
            setTakenCourses={() => []}
            setSemesterCourses={() => []}
            removeSemesterCourses={() => []}
            updateCourses={() => []}
            updateSemesterCourses={() => []}
        />
    );
    test("test the button", () => {
        const savebutton = screen.getByRole("button", { name: /Add Course/i });
        savebutton.click();
    });
});
