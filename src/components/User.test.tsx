import { expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import User from "./User";

test("user", () => {
    render(<User user={{ avatarUrl: "x", company: "x", htmlUrl: "x", location: "x", login: "glendajunker", name: "x" }} />);
 
    expect(screen.getByText("glendajunker")).toBeDefined();
});
