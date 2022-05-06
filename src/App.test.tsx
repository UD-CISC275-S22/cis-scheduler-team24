import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
// from "@testing-library/user-event";

test("renders the Python somewhere 1", () => {
    render(<App />);
    const answerText = screen.queryAllByText(/Python/i);
    expect(answerText[0]).toBeInTheDocument();
});

test("renders the Python somewhere 2", () => {
    render(<App />);
    const answerText = screen.queryAllByText(/Python/i);
    expect(answerText[1]).toBeInTheDocument();
});

// test("renders the (CISC108: Introduction to Computer Science I Credit: 3) somewhere", () => {
//     render(<App />);
//     const answerText = screen.queryAllByText(
//         /CISC108: Introduction to Computer Science I Credit: 3/i
//     );
//     expect(answerText[1]).toBeInTheDocument();
// });

// test("Edit require can be used", () => {
//     render(<App />);
//     const EditButton = screen.getAllByRole("button", {
//         name: /Edit/i
//     });
//     EditButton[0].click();
//     const RequireCheckbox = screen.getByRole("checkbox", {
//         name: /Required?/i
//     });
//     RequireCheckbox.click();
//     const SaveButton = screen.getByRole("button", {
//         name: /Save/i
//     });
//     SaveButton.click();
//     EditButton[0].click();
//     RequireCheckbox.click();
//     SaveButton.click();
//     expect(RequireCheckbox).toBeInTheDocument();
// });

// test("Delete Plan can be used", () => {
//     render(<App />);
//     const deleteButton = screen.getAllByRole("button", {
//         name: /✖️/i
//     });
//     deleteButton[0].click();
//     const AddPlanButton = screen.getByRole("button", {
//         name: /Add Plan/i
//     });
//     AddPlanButton.click();
//     expect(AddPlanButton).toBeInTheDocument();
// });

// test("Delete All Course can be used", () => {
//     render(<App />);
//     const DeleteAllCourseButton = screen.getAllByRole("button", {
//         name: /Delete All Course/i
//     });
//     DeleteAllCourseButton[0].click();
//     const DeleteAllCourseButton1 = screen.getByRole("button", {
//         name: /Delete All Courses/i
//     });
//     DeleteAllCourseButton1.click();
//     const answerText = screen.queryAllByText(/Jingqing/i);
//     expect(answerText[0]).toBeInTheDocument();
// });

// test("test the Edit Course", () => {
//     render(<App />);
//     const EnterCourseIDButton = screen.getAllByTestId("Enter-Course-ID");
//     const EnterCreditsButton = screen.getAllByTestId("Enter-Credits");
//     const EnterNameButton = screen.getAllByTestId("Enter-Name");
//     const EnterDescriptionButton = screen.getAllByTestId("Enter-Description");
//     const EnterPrerequisitesButton = screen.getAllByTestId(
//         "Enter-Prerequisites"
//     );
//     userEvent.type(EnterNameButton[0], "GUESS101");
//     userEvent.type(EnterCourseIDButton[0], "10");
//     userEvent.type(EnterCreditsButton[0], "3");
//     userEvent.type(EnterDescriptionButton[0], "Guess what course here");
//     userEvent.type(EnterPrerequisitesButton[0], "5");
//     const savebutton = screen.getAllByRole("button", { name: /Add Course/i });
//     savebutton[0].click();
//     const answerText = screen.queryAllByText(/10/i);
//     expect(answerText[0]).toBeInTheDocument();
// });

// test("Delete Semester can be used", () => {
//     render(<App />);
//     const deleteButton = screen.getAllByRole("button", {
//         name: /✖️/i
//     });
//     deleteButton[3].click();
//     const answerText = screen.queryAllByText(/Jingqing/i);
//     expect(answerText[0]).toBeInTheDocument();
// });

// test("Add Semester can be used", () => {
//     render(<App />);
//     const AddSemesterButton = screen.getAllByRole("button", {
//         name: /Add Semester/i
//     });
//     AddSemesterButton[0].click();
//     const answerText = screen.queryAllByText(/Jingqing/i);
//     expect(answerText[0]).toBeInTheDocument();
// });

// test("Edit Plan name can be used", () => {
//     render(<App />);
//     const EditPlanNameButton = screen.getAllByTestId("Edit Plan Name Button");
//     EditPlanNameButton[0].click();
//     const htmlinput = screen.getByTestId("editplan");
//     userEvent.type(htmlinput, "3");
//     const SaveButton = screen.getByTestId("editplan-save");
//     SaveButton.click();
//     const answerText = screen.queryAllByText(/Jingqing/i);
//     expect(answerText[0]).toBeInTheDocument();
// });

// test("Clear Semester can be used", () => {
//     render(<App />);
//     const ClearSemesterButton = screen.getAllByRole("button", {
//         name: /Clear Semester/i
//     });
//     ClearSemesterButton[0].click();
//     const ClearAllSemesterButton = screen.getAllByRole("button", {
//         name: /Clear all Semesters/i
//     });
//     ClearAllSemesterButton[0].click();
//     const answerText = screen.queryAllByText(/Jingqing/i);
//     expect(answerText[0]).toBeInTheDocument();
// });

// test("Edit Semester name can be used", () => {
//     render(<App />);
//     const EditSemesterNameButton = screen.getAllByTestId("Edit-semester-name");
//     EditSemesterNameButton[0].click();
//     const htmlinput = screen.getAllByTestId("editSemester");
//     userEvent.type(htmlinput[0], "3");
//     const EditSemesterSaveButton = screen.getAllByTestId("editSemester-save");
//     EditSemesterSaveButton[0].click();
//     const answerText = screen.queryAllByText(/Jingqing/i);
//     expect(answerText[0]).toBeInTheDocument();
// });

// test("Delete course X can be used", () => {
//     render(<App />);
//     const DeletecourseXButton = screen.getAllByTestId("Delete-course-X");
//     DeletecourseXButton[0].click();
//     const modalDeletebuttonxButton = screen.getAllByTestId(
//         "modal-Delete-button-x"
//     );
//     modalDeletebuttonxButton[0].click();
//     const answerText = screen.queryAllByText(/Jingqing/i);
//     expect(answerText[0]).toBeInTheDocument();
// });
