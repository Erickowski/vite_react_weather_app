import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Select, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import { COUNTRIES, LOCAL_STORAGE_KEYS, ROUTES } from "@src/types";
import { Layout } from "@src/components";
import { useUsernameStore } from "@src/stores";

import { STYLES } from "./styles";

export function Home() {
  const navigate = useNavigate();

  const { username, setUsername } = useUsernameStore((state) => state);

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

  return (
    <Layout>
      <Header style={STYLES.header}>
        <Typography.Title level={2}>Welcome {username}</Typography.Title>
        <Button type="text" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Content>
        <Typography.Title level={3}>Country Input</Typography.Title>
        <Select
          defaultValue="Select some country"
          style={STYLES.select}
          options={COUNTRIES}
        />
      </Content>
      <Content>City List</Content>
      <Content>Weather Cards</Content>
    </Layout>
  );
}
