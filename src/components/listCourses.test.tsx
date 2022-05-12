import React from "react";
import { render, screen } from "@testing-library/react";
import { ListCourses } from "./listCourses";

describe("listCourses", () => {
    render(
        <ListCourses
            allCourses={[]}
            semesterCourses={[]}
            floatingCourses={[]}
            requiredCourses={[]}
            takenCourses={[]}
            setFloats={() => []}
            setRequirements={() => []}
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