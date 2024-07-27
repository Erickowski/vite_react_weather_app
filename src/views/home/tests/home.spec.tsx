import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

import {
  useWeatherStore,
  useUsernameStore,
  useWeatherSelectedStore,
} from "@src/stores";
import { QUERY_STATUS, ROUTES } from "@src/types";

import { Home } from "../home";

jest.mock("@src/stores", () => ({
  ...jest.requireActual("@src/stores"),
  useWeatherStore: jest.fn(),
  useUsernameStore: jest.fn(),
  useWeatherSelectedStore: jest.fn(),
}));

const navigateMock = jest.fn();
const fetchWeatherMock = jest.fn();
const clearWeatherMock = jest.fn();
const setUsernameMock = jest.fn();
const addWeatherMock = jest.fn();
const clearWeathersMock = jest.fn();
const removeWeatherMock = jest.fn();

const WEATHER_DATA_MOCK = {
  id: "unique-id",
  name: "name",
  region: "region",
  country: "country",
  humidity: 78,
  tempC: 25,
  windMph: 2.3,
  icon: "",
};

describe("Home", () => {
  beforeAll(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useWeatherStore as unknown as jest.Mock).mockReturnValue({
      weather: {
        data: {},
        error: "",
        status: QUERY_STATUS.idle,
      },
      fetchWeather: fetchWeatherMock,
      clearWeather: clearWeatherMock,
    });
    (useUsernameStore as unknown as jest.Mock).mockReturnValue({
      username: "username",
      setUsername: setUsernameMock,
    });
    (useWeatherSelectedStore as unknown as jest.Mock).mockReturnValue({
      weathers: [],
      addWeather: addWeatherMock,
      clearWeathers: clearWeathersMock,
      removeWeather: removeWeatherMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call navigate, setUsernameMock and clearWeathersMock when user clicks on logout button", async () => {
    // arrange
    const { getByRole } = render(<Home />);

    // act
    await userEvent.click(getByRole("button", { name: "logout-button" }));

    // assert
    expect(setUsernameMock).toHaveBeenCalledWith("");
    expect(clearWeathersMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith(ROUTES.login);
  });

  test("should render error message if user does not type any country or city", async () => {
    // arrange
    const { container, getByText } = render(<Home />);

    // act
    await userEvent.click(container.querySelector(".ant-input-search-button")!);

    // assert
    expect(getByText("Country and city are required")).toBeInTheDocument();
  });

  test("should render error message if user does an invalid city name", async () => {
    // arrange
    const { container, getByText, getByRole } = render(<Home />);

    // act
    await userEvent.type(getByRole("textbox", { name: "search-input" }), " ");
    await userEvent.click(container.querySelector(".ant-input-search-button")!);

    // assert
    expect(getByText("Country and city are required")).toBeInTheDocument();
  });

  test("should call fetchWeatherMock when user type country and city correctly", async () => {
    // arrange
    const city = "Bogota";
    const country = "CO";
    const { container, getByRole, getByText } = render(<Home />);

    // act
    await userEvent.clear(getByRole("textbox", { name: "search-input" }));
    await userEvent.click(getByRole("combobox"));
    await userEvent.click(getByText("Colombia"));
    await userEvent.type(getByRole("textbox", { name: "search-input" }), city);
    await userEvent.click(container.querySelector(".ant-input-search-button")!);

    // assert
    expect(fetchWeatherMock).toHaveBeenCalledWith({
      city,
      country,
    });
  });

  test("should call clearWeather when clicks on add city button", async () => {
    // arrange
    const weatherData = {
      id: "unique-id",
      name: "name",
      region: "region",
      country: "country",
    };
    (useWeatherStore as unknown as jest.Mock).mockReturnValueOnce({
      weather: {
        data: weatherData,
        error: "",
        status: QUERY_STATUS.success,
      },
      fetchWeather: fetchWeatherMock,
      clearWeather: clearWeatherMock,
    });
    const { getByRole } = render(<Home />);

    // act
    await userEvent.click(getByRole("button", { name: "add-city-button" }));

    // assert
    expect(addWeatherMock).toHaveBeenCalledWith(weatherData);
    expect(clearWeatherMock).toHaveBeenCalled();
  });

  test("should render error message if user try to add a duplicated city", async () => {
    // arrange
    (useWeatherStore as unknown as jest.Mock).mockReturnValueOnce({
      weather: {
        data: WEATHER_DATA_MOCK,
        error: "",
        status: QUERY_STATUS.success,
      },
      fetchWeather: fetchWeatherMock,
      clearWeather: clearWeatherMock,
    });
    (useWeatherSelectedStore as unknown as jest.Mock).mockReturnValueOnce({
      weathers: [WEATHER_DATA_MOCK],
      addWeather: addWeatherMock,
      clearWeathers: clearWeathersMock,
      removeWeather: removeWeatherMock,
    });
    const { getByRole, getByText } = render(<Home />);

    // act
    await userEvent.click(getByRole("button", { name: "add-city-button" }));

    // assert
    expect(getByText("This city is added before.")).toBeInTheDocument();
  });

  test("should call remove weather when remove button is clicked", async () => {
    // arrange
    (useWeatherStore as unknown as jest.Mock).mockReturnValueOnce({
      weather: {
        data: WEATHER_DATA_MOCK,
        error: "",
        status: QUERY_STATUS.success,
      },
      fetchWeather: fetchWeatherMock,
      clearWeather: clearWeatherMock,
    });
    (useWeatherSelectedStore as unknown as jest.Mock).mockReturnValueOnce({
      weathers: [WEATHER_DATA_MOCK],
      addWeather: addWeatherMock,
      clearWeathers: clearWeathersMock,
      removeWeather: removeWeatherMock,
    });
    const { getByRole } = render(<Home />);

    // act
    await userEvent.click(getByRole("button", { name: "remove-city-button" }));

    // assert
    expect(removeWeatherMock).toHaveBeenCalledWith(WEATHER_DATA_MOCK.id);
  });
});
