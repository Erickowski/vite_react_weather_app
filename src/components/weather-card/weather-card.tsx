import { Card, Typography } from "antd";

import { WeatherFormatted } from "@src/types";

import { STYLES } from "./styles";

export function WeatherCard({
  humidity,
  country,
  name,
  tempC,
  windMph,
  icon,
}: WeatherFormatted) {
  return (
    <Card
      size="small"
      title={`${name}, ${country}`}
      extra={<a href="#">Remove</a>}
      style={{ width: 250 }}
    >
      <div style={STYLES.image}>
        <img src={icon} />
      </div>
      <div style={STYLES.text}>
        <Typography.Text strong>Temperature:</Typography.Text>
        <Typography.Text>{tempC}°C</Typography.Text>
      </div>
      <div style={STYLES.text}>
        <Typography.Text strong>Humidity:</Typography.Text>
        <Typography.Text>{humidity}%</Typography.Text>
      </div>
      <div style={STYLES.text}>
        <Typography.Text strong>Wind Speed:</Typography.Text>
        <Typography.Text>{windMph} mph</Typography.Text>
      </div>
    </Card>
  );
}
