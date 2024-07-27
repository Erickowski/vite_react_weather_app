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
};
