import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import { LOCAL_STORAGE_KEYS, QUERY_STATUS, ROUTES } from "@src/types";
import { Layout } from "@src/components";
import { useUsernameStore, useCountriesStore } from "@src/stores";

import { STYLES } from "./styles";

export function Home() {
  const navigate = useNavigate();

  const { username, setUsername } = useUsernameStore((state) => state);
  const { countries, fetchCountries } = useCountriesStore((state) => state);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.username);
    setUsername("");
    navigate(ROUTES.login);
  };

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.username)) {
      navigate(ROUTES.login);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    if (countries.status === QUERY_STATUS.idle) {
      fetchCountries();
    }
  }, [username, countries.status]);

  console.info(countries.data);

  return (
    <Layout>
      <Header style={STYLES.header}>
        <Typography.Title level={2}>Welcome {username}</Typography.Title>
        <Button type="text" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Content>Country Input</Content>
      <Content>City List</Content>
      <Content>Weather Cards</Content>
    </Layout>
  );
}
