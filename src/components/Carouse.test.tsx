import React from "react";
import { render, screen } from "@testing-library/react";
import { Carouse } from "./Carouse";

describe("Carous tests", () => {
    beforeEach(() => {
        render(<Carouse />);
    });

    test("Jingqing is visiable", () => {
        const answerText = screen.queryByText(/Jingqing/);
        expect(answerText).toBeInTheDocument();
    });

    test("Weldin is visiable", () => {
        const answerText = screen.queryByText(/Weldin/);
        expect(answerText).toBeInTheDocument();
    });

    test("Zhiwen is visiable", () => {
        const answerText = screen.queryByText(/Zhiwen/);
        expect(answerText).toBeInTheDocument();
    });

    test("Team 24 is visiable", () => {
        const answerText = screen.queryByText(/Team 24/);
        expect(answerText).toBeInTheDocument();
    });

    test("UD is visiable", () => {
        const answerText = screen.queryByText(/UD/);
        expect(answerText).toBeInTheDocument();
    });
});
