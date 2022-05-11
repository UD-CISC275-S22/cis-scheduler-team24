import React from "react";
import { render, screen } from "@testing-library/react";
import { GreetingMessage } from "./greetingMessage";
import { cleanup } from "@testing-library/react";

describe("GreetingMessage tests", () => {
    beforeEach(() => {
        render(<GreetingMessage />);
    });

    afterEach(cleanup);

    test("test Helpbutton can be use", () => {
        const Helpbutton = screen.getByRole("button", {
            name: /Or, if you are having trouble, here are some common questions and answers:/i
        });
        Helpbutton.click();
        expect(Helpbutton).toBeEnabled;
    });

    test("test Helpbutton will be open", () => {
        const Helpbutton = screen.getByRole("button", {
            name: /Or, if you are having trouble, here are some common questions and answers:/i
        });
        Helpbutton.click();
        const HelpPlanbutton = screen.getByRole("button", {
            name: /Plans/
        });
        expect(HelpPlanbutton).toBeEnabled;
    });

    test("test HelpPlanbutton will be open", () => {
        const Helpbutton = screen.getByRole("button", {
            name: /Or, if you are having trouble, here are some common questions and answers:/i
        });
        Helpbutton.click();
        const HelpPlanbutton = screen.getByRole("button", {
            name: /Plans/
        });
        HelpPlanbutton.click();
        const HelpPlanbuttoncontent1 = screen.getByRole("button", {
            name: /Where are my different plans?/
        });
        HelpPlanbuttoncontent1.click();
        expect(HelpPlanbuttoncontent1).toBeEnabled;
    });
});
