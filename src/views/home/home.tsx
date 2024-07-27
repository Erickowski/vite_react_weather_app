import { ChangeEvent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Select, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import {
  COUNTRIES,
  LOCAL_STORAGE_KEYS,
  QUERY_STATUS,
  ROUTES,
} from "@src/types";
import { Layout } from "@src/components";
import {
  useUsernameStore,
  useSearchStore,
  SEARCH_INITIAL_STATE,
  useWeatherStore,
} from "@src/stores";

import { STYLES } from "./styles";
import Search from "antd/es/input/Search";

export function Home() {
  const navigate = useNavigate();

  const { username, setUsername } = useUsernameStore((state) => state);
  const { city, country, setCity, setCountry } = useSearchStore(
    (state) => state
  );
  const { weather, fetchWeather } = useWeatherStore((state) => state);

  const [areValuesValid, setAreValuesValid] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.username);
    setUsername("");
    navigate(ROUTES.login);
  };

  const handleCountry = (countryValue: string) => {
    setCountry(countryValue);
  };

  const handleCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (country === SEARCH_INITIAL_STATE.country || city.trim() === "") {
      setAreValuesValid(false);
      return;
    }

    setAreValuesValid(true);
    fetchWeather({ city, country });
  };

  const handleAddCity = () => {
    console.log(weather.data);
  };

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.username)) {
      navigate(ROUTES.login);
    }
  }, []);

  return (
    <Layout>
      <Header style={STYLES.header}>
        <Typography.Title level={2}>Welcome {username}</Typography.Title>
        <Button type="text" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Content>
        <Typography.Title level={3}>Country List</Typography.Title>
        <Select
          defaultValue={country}
          style={STYLES.select}
          options={COUNTRIES}
          onChange={handleCountry}
        />
      </Content>
      <Content>
        <Typography.Title level={3}>City Input</Typography.Title>
        <Search
          placeholder="Type some city"
          enterButton="Search"
          size="large"
          value={city}
          onChange={handleCity}
          onSearch={handleSearch}
          loading={weather.status === QUERY_STATUS.loading}
        />
        {!areValuesValid && (
          <Typography.Text style={STYLES.textError}>
            Country and city are required
          </Typography.Text>
        )}
      </Content>
      <Content>
        {weather.status === QUERY_STATUS.success && (
          <div>
            <Typography.Title level={4}>City found</Typography.Title>
            <div style={STYLES.cityFound}>
              <Typography.Text>
                {weather.data.name}, {weather.data.region},{" "}
                {weather.data.country}
              </Typography.Text>
              <Button onClick={handleAddCity}>Add City</Button>
            </div>
          </div>
        )}
        {weather.status === QUERY_STATUS.error && (
          <Typography.Text style={STYLES.textError}>
            {weather.error}
          </Typography.Text>
        )}
      </Content>
      {/* <p>Weather Cards</p> */}
    </Layout>
  );
}
