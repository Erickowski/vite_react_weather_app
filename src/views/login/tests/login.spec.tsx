import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

import { LOCAL_STORAGE_KEYS, ROUTES } from "@src/types";

import { Login } from "../login";

const navigateMock = jest.fn();
const getItemMock = jest.fn();
const setItemMock = jest.fn();

describe("Login", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: (...args: string[]) => getItemMock(...args),
        setItem: (...args: string[]) => setItemMock(...args),
      },
    });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  test("should render error if user does not type any username", async () => {
    // arrange
    const { getByRole, getByText } = render(<Login />);

    // act
    await userEvent.click(getByRole("button", { name: "login-button" }));

    // assert
    expect(getByText("Username is required")).toBeInTheDocument();
  });

  test("should render error if user does not type invalid username", async () => {
    // arrange
    const { getByRole, getByText } = render(<Login />);

    // act
    await userEvent.type(getByRole("textbox", { name: "username-input" }), " ");
    await userEvent.click(getByRole("button", { name: "login-button" }));

    // assert
    expect(getByText("Username is required")).toBeInTheDocument();
  });

  test("should call navigate and setItem when user type a valid username and clicks on login button", async () => {
    // arrange
    const userNameValue = "Username";
    const { getByRole } = render(<Login />);

    // act
    await userEvent.clear(getByRole("textbox", { name: "username-input" }));
    await userEvent.type(
      getByRole("textbox", { name: "username-input" }),
      userNameValue
    );
    await userEvent.click(getByRole("button", { name: "login-button" }));

    // assert
    expect(setItemMock).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.username,
      userNameValue
    );
    expect(navigateMock).toHaveBeenCalledWith(ROUTES.home);
  });
});
