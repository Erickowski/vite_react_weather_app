import { Button, Card, Typography } from "antd";

import { WeatherFormatted } from "@src/types";
import { useWeatherSelectedStore } from "@src/stores";

import { STYLES } from "./styles";

export function WeatherCard({
  id,
  humidity,
  country,
  name,
  tempC,
  windMph,
  icon,
}: WeatherFormatted) {
  const removeWeather = useWeatherSelectedStore((state) => state.removeWeather);

  const handleRemove = () => {
    removeWeather(id);
  };

  return (
    <Card
      size="small"
      title={`${name}, ${country}`}
      extra={
        <Button type="link" onClick={handleRemove}>
          Remove
        </Button>
      }
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
