import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders the course name somewhere", async () => {
    render(<App />);
    const name = screen.getByText(/Jingqing/i);
    await waitFor(() => {
        expect(name).toBeInTheDocument();
    });
});
