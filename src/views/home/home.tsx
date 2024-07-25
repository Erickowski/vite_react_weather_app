import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import { LOCAL_STORAGE_KEYS, ROUTES } from "@src/types";
import { Layout } from "@src/components";
import { useUsernameStore } from "@src/stores";

import { STYLES } from "./styles";

export function Home() {
  const navigate = useNavigate();

  const username = useUsernameStore((state) => state.username);

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.username)) {
      navigate(ROUTES.login);
    }
  }, []);

  return (
    <Layout>
      <Header style={STYLES.header}>
        <Typography.Title level={2}>Welcome {username}</Typography.Title>
        <Button type="text">Logout</Button>
      </Header>
      <Content>Country Input</Content>
      <Content>City List</Content>
      <Content>Weather Cards</Content>
    </Layout>
  );
}
