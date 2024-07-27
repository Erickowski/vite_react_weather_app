import { ChangeEvent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Input, Typography, Layout as LayoutComponent } from "antd";

import { LOCAL_STORAGE_KEYS, ROUTES } from "@src/types";
import { Layout } from "@src/components";
import { useUsernameStore } from "@src/stores";

import { STYLES } from "./styles";

const { Content, Footer, Header } = LayoutComponent;

export function Login() {
  const navigate = useNavigate();

  const { username, setUsername } = useUsernameStore((state) => state);
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleLogin = () => {
    if (username.trim() !== "") {
      setIsUsernameValid(true);
      localStorage.setItem(LOCAL_STORAGE_KEYS.username, username);
      navigate(ROUTES.home);
    } else {
      setIsUsernameValid(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.username)) {
      navigate(ROUTES.home);
    }
  }, []);

  return (
    <Layout>
      <Header style={STYLES.header}>
        <Typography.Title level={1}>Login</Typography.Title>
      </Header>
      <Content style={STYLES.content}>
        <Typography.Title level={5}>Username</Typography.Title>
        <Input
          onChange={handleChangeUsername}
          status={isUsernameValid ? "" : "error"}
          value={username}
        />
        {!isUsernameValid && (
          <Typography.Text style={STYLES.textError}>
            Username is required
          </Typography.Text>
        )}
      </Content>
      <Footer style={STYLES.footer}>
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
      </Footer>
    </Layout>
  );
}
