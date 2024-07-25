import { ChangeEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Input, Layout, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

import { ROUTES } from "@src/types";

import { STYLES } from "./styles";

export function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleLogin = () => {
    if (username.trim()) {
      setIsUsernameValid(true);
      navigate(ROUTES.home);
    } else {
      setIsUsernameValid(false);
    }
  };

  return (
    <Layout style={STYLES.layout}>
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
