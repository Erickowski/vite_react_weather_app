import { ChangeEvent, useState } from "react";

import { Button, Input, Layout, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

import { STYLES } from "./styles";

export function Login() {
  const [username, setUsername] = useState("");

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleLogin = () => {
    window.alert("Hello " + username);
  };

  return (
    <Layout style={STYLES.layout}>
      <Header style={STYLES.header}>
        <Typography.Title level={1}>Login</Typography.Title>
      </Header>
      <Content style={STYLES.content}>
        <Typography.Title level={5}>Username</Typography.Title>
        <Input value={username} onChange={handleChangeUsername} />
      </Content>
      <Footer style={STYLES.footer}>
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
      </Footer>
    </Layout>
  );
}
