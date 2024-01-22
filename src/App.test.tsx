import { expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("app", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("Type a username...");
    await user.type(input, "glendajunker");

    const submitBtn = screen.getByText("Search");
    await user.click(submitBtn);

    expect(screen.getByText("glendajunker")).toBeInTheDocument();
});
