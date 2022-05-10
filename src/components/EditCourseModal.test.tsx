import React from "react";
import { render, screen } from "@testing-library/react";
import { EditCourseModal } from "./EditCourseModal";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("EditCourseModal tests", () => {
    const examplecourse = {
        id: 0,
        name: "",
        credits: 0,
        description: "",
        prerequisites: [],
        isTaken: false,
        isEditing: false,
        isRequired: false,
        breadthType: ""
    };

    beforeEach(() => {
        render(
            <EditCourseModal
                handleClose={() => []}
                course={examplecourse}
                requiredCourses={[]}
                editCourse={() => []}
                deleteCourse={() => []}
                setRequirements={() => []}
            />
        );
    });

    afterEach(cleanup);

    test("There is a button labeled Edit", () => {
        const EditButton = screen.getByRole("button", {
            name: /Edit/i
        });
        expect(EditButton).toBeInTheDocument();
    });

    test("Clicking Delete button show the Edit Course modal", () => {
        const EditButton = screen.getByRole("button", {
            name: /Edit/i
        });
        EditButton.click();
        const answerText = screen.queryByText(/Edit Course/);
        expect(answerText).toBeInTheDocument();
    });

    test("Clicking Delete button show the Button", () => {
        const EditCourseButton = screen.getByRole("button", {
            name: /Edit/i
        });
        EditCourseButton.click();
        const SaveButton = screen.getByRole("button", {
            name: /Save/i
        });
        const CancelButton = screen.getByRole("button", {
            name: /Cancel/i
        });
        const DeleteButton = screen.getByRole("button", {
            name: /Delete/i
        });
        const ResetButton = screen.getByRole("button", {
            name: /Reset/i
        });
        expect(SaveButton).toBeInTheDocument();
        expect(CancelButton).toBeInTheDocument();
        expect(DeleteButton).toBeInTheDocument();
        expect(ResetButton).toBeInTheDocument();
    });

    test("Clicking Delete button and clicking the Button", () => {
        const EditCourseButton = screen.getByRole("button", {
            name: /Edit/i
        });
        EditCourseButton.click();
        const SaveButton = screen.getByRole("button", {
            name: /Save/i
        });
        SaveButton.click();
        const CancelButton = screen.getByRole("button", {
            name: /Cancel/i
        });
        CancelButton.click();
        const DeleteButton = screen.getByRole("button", {
            name: /Delete/i
        });
        DeleteButton.click();
        const ResetButton = screen.getByRole("button", {
            name: /Reset/i
        });
        ResetButton.click();
        const RequiredButton = screen.getByTestId("Required?");
        RequiredButton.click();
        SaveButton.click();
        expect(SaveButton).toBeDisabled();
        expect(CancelButton).toBeEnabled();
        const DeleteCourseModalButton = screen.getByTestId(
            "modal-Delete-button"
        );
        DeleteCourseModalButton.click();
        SaveButton.click();
        expect(DeleteButton).toBeEnabled();
        expect(RequiredButton).toBeEnabled();
    });

    test("Clicking Delete button and Required Button", () => {
        const EditCourseButton = screen.getByRole("button", {
            name: /Edit/i
        });
        EditCourseButton.click();
        const RequiredButton = screen.getByTestId("Required?");
        RequiredButton.click();
        const SaveButton = screen.getByRole("button", {
            name: /Save/i
        });
        SaveButton.click();
        const EditCourseButton2 = screen.getByRole("button", {
            name: /Edit/i
        });
        EditCourseButton2.click();
        const RequiredButton2 = screen.getByTestId("Required?");
        RequiredButton2.click();
        const SaveButton2 = screen.getByRole("button", {
            name: /Save/i
        });
        SaveButton2.click();
        expect(EditCourseButton).toBeEnabled();
    });

    test("Clicking Delete button and Course name control", () => {
        const EditCourseButton = screen.getByRole("button", {
            name: /Edit/i
        });
        EditCourseButton.click();
        const ControlCoursename = screen.getByTestId("Edit Course name");
        userEvent.type(ControlCoursename, "CISC275");
        expect(ControlCoursename).toBeEnabled();
    });

    test("Clicking Delete button and Course description control", () => {
        const EditCourseButton = screen.getByRole("button", {
            name: /Edit/i
        });
        EditCourseButton.click();
        const ControlCoursedescription = screen.getByTestId(
            "Edit Course description"
        );
        userEvent.type(ControlCoursedescription, "Guess");
        expect(ControlCoursedescription).toBeEnabled();
    });

    test("Clicking Delete button and Course credits control", () => {
        const EditCourseButton = screen.getByRole("button", {
            name: /Edit/i
        });
        EditCourseButton.click();
        const ControlCoursecredits = screen.getByTestId("Edit Course credits");
        userEvent.type(ControlCoursecredits, "3");
        expect(ControlCoursecredits).toBeEnabled();
    });

    test("Clicking Delete button and Course Prerequisities control", () => {
        const EditCourseButton = screen.getByRole("button", {
            name: /Edit/i
        });
        EditCourseButton.click();
        const ControlCoursePrerequisities = screen.getByTestId(
            "Edit Course Prerequisities"
        );
        userEvent.type(ControlCoursePrerequisities, "CISC108");
        expect(ControlCoursePrerequisities).toBeEnabled();
    });

    test("Cliking the save button and can be used", () => {
        const EditCourseButton = screen.getAllByRole("button", {
            name: /Edit/i
        });
        EditCourseButton[0].click();
        const SaveButton = screen.getAllByRole("button", {
            name: /Save/i
        });
        SaveButton[0].click();
        expect(EditCourseButton[0]).toBeInTheDocument();
    });
});
