import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import { ROUTES } from "@src/types";
import { Layout } from "@src/components";

import { STYLES } from "./styles";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate(ROUTES.login);
    }
  }, []);

  return (
    <Layout>
      <Header style={STYLES.header}>
        <Typography.Title level={2}>Welcome USERNAME</Typography.Title>
        <Button type="text">Logout</Button>
      </Header>
      <Content>Country Input</Content>
      <Content>City List</Content>
      <Content>Weather Cards</Content>
    </Layout>
  );
}
