import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Saving for the website", async () => {
    render(<App />);
    const Saving = screen.getByTestId("Saving");
    Saving.click();
    const SavingLable = screen.getByText(/Saving/i);
    await waitFor(() => {
        expect(SavingLable).toBeInTheDocument();
    });
    Saving.click();
    const UnsavedLable = screen.getByText(/Unsaved/i);
    await waitFor(() => {
        expect(UnsavedLable).toBeInTheDocument();
    });
    cleanup;
});

test("test the Add Plan button", async () => {
    render(<App />);
    const AddplanButton = screen.getAllByRole("button", {
        name: /Add Plan/i
    });
    AddplanButton[0].click();
    await waitFor(() => {
        expect(AddplanButton).toBeEnabled;
    });
    cleanup;
});

test("test the ✖️ plan button", async () => {
    render(<App />);
    const DeleteplanButton = screen.getAllByRole("button", {
        name: /✖️/i
    });
    DeleteplanButton[0].click();
    await waitFor(() => {
        expect(DeleteplanButton).toBeEnabled;
    });
    cleanup;
});

test("test the edit plan name button", async () => {
    render(<App />);
    const EditplanNameButton = screen.getAllByTestId("Edit Plan Name Button");
    EditplanNameButton[0].click();
    const EditplanName = screen.getAllByTestId("editplan");
    userEvent.type(EditplanName[0], "CISC275");
    const EditplanSave = screen.getAllByTestId("editplan-save");
    EditplanSave[0].click();
    await waitFor(() => {
        expect(EditplanNameButton).toBeEnabled;
    });
    cleanup;
});

test("test the Add Semester button", async () => {
    render(<App />);
    const AddSemesterButton = screen.getAllByRole("button", {
        name: /Add Semester/i
    });
    AddSemesterButton[0].click();
    await waitFor(() => {
        expect(AddSemesterButton).toBeEnabled;
    });
    cleanup;
});

test("test the Delete Semester button", async () => {
    render(<App />);
    const DeleteSemester = screen.getAllByTestId("Delete-Semester");
    DeleteSemester[0].click();
    await waitFor(() => {
        expect(DeleteSemester).toBeEnabled;
    });
    cleanup;
});

test("test the Clear Semester button", async () => {
    render(<App />);
    const ClearSemesterButton = screen.getAllByRole("button", {
        name: /Clear Semester/i
    });
    ClearSemesterButton[0].click();
    const DeleteSemester = screen.getAllByTestId("Clear-all-semesters-button");
    DeleteSemester[0].click();
    await waitFor(() => {
        expect(ClearSemesterButton).toBeEnabled;
    });
    cleanup;
});

test("test the set Semester Name button", async () => {
    render(<App />);
    const EditSemester = screen.getAllByTestId("Edit-semester-name");
    EditSemester[0].click();
    const EditSemesterName = screen.getAllByTestId("editSemester");
    userEvent.type(EditSemesterName[0], "CISC275");
    const EditSemesterSave = screen.getAllByTestId("editSemester-save");
    EditSemesterSave[0].click();
    await waitFor(() => {
        expect(EditSemester).toBeEnabled;
    });
    cleanup;
});

test("test the skip button", async () => {
    render(<App />);
    const SkipButton = screen.getAllByRole("checkbox", {
        name: /Skip/i
    });
    SkipButton[0].click();
    await waitFor(() => {
        expect(SkipButton).toBeEnabled;
    });

    SkipButton[0].click();
    await waitFor(() => {
        expect(SkipButton).toBeEnabled;
    });
    cleanup;
});
