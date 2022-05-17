import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { ListCourses } from "./listCourses";
import userEvent from "@testing-library/user-event";

describe("listCourses", () => {
    beforeEach(() => {
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
                editCourse={() => []}
            />
        );
    });

    afterEach(cleanup);

    test("test the Save Button", () => {
        const savebutton = screen.getByRole("button", { name: /Add Course/i });
        expect(savebutton).toBeEnabled;
    });

    test("test the Enter Name", () => {
        const EnterNameButton = screen.getByTestId("Enter-Name");
        userEvent.type(EnterNameButton, "CISC275");
        const text = screen.getByText(/Course Name/i);
        expect(text).toBeInTheDocument;
    });

    test("test the Enter Description", () => {
        const EnterDescriptionButton = screen.getByTestId("Enter-Description");
        userEvent.type(EnterDescriptionButton, "Python");
        const text = screen.getByText(/Course Description/i);
        expect(text).toBeInTheDocument;
    });

    test("test the Enter Credits Button", () => {
        const EnterCreditsButton = screen.getByTestId("Enter-Credits");
        userEvent.type(EnterCreditsButton, "3");
        const text = screen.getByText(/Course Credit/i);
        expect(text).toBeInTheDocument;
    });

    test("test the Enter Prerequisites Button", () => {
        const EnterPrerequisitesButton = screen.getByTestId(
            "Enter-Prerequisites"
        );
        userEvent.type(EnterPrerequisitesButton, "MATH241");
        const text = screen.getByText(/Course Prerequisites/i);
        expect(text).toBeInTheDocument;
    });

    test("test the Enable of Save button", () => {
        const savebutton = screen.getByRole("button", { name: /Add Course/i });
        const EnterNameButton = screen.getByTestId("Enter-Name");
        userEvent.type(EnterNameButton, "CISC275");
        const EnterCreditsButton = screen.getByTestId("Enter-Credits");
        userEvent.type(EnterCreditsButton, "3");
        expect(savebutton).toBeEnabled;
    });

    test("test the Clicking of Save button", () => {
        const savebutton = screen.getByRole("button", {
            name: /Add Course/i
        });
        const EnterNameButton = screen.getByTestId("Enter-Name");
        userEvent.type(EnterNameButton, "CISC275");
        const EnterDescriptionButton = screen.getByTestId("Enter-Description");
        userEvent.type(EnterDescriptionButton, "Python");
        const EnterCreditsButton = screen.getByTestId("Enter-Credits");
        userEvent.type(EnterCreditsButton, "3");
        const EnterPrerequisitesButton = screen.getByTestId(
            "Enter-Prerequisites"
        );
        userEvent.type(EnterPrerequisitesButton, "MATH241");
        savebutton.click();
        expect(/CISC275/i).toBeInTheDocument;
        expect(/Python/i).toBeInTheDocument;
        expect(/3/i).toBeInTheDocument;
        expect(/MATH241/i).toBeInTheDocument;
    });
});
