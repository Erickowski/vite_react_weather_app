import { GLOBAL_STYLES } from "@src/styles";

export const STYLES: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  select: { width: "100%" },
  textError: GLOBAL_STYLES.text.error,
  cityFound: { display: "flex", justifyContent: "space-between" },
  weatherCards: { display: "flex", flexWrap: "wrap", gap: "20px" },
};
