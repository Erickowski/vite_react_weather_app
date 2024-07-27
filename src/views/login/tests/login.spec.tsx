import { render, screen } from "@testing-library/react";

import { Login } from "../login";

describe("Login", () => {
  test("demo", () => {
    render(<Login />);

    screen.debug();
  });
});
