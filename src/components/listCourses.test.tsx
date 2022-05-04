import React from "react";
import { render, screen } from "@testing-library/react";
import { ListCourses } from "./listCourses";

describe("listCourses", () => {
    render(
        <ListCourses
            semesterCourses={[]}
            floatingCourses={[]}
            requiredCourses={[]}
            setFloats={() => []}
            setRequirements={() => []}
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
