import { GLOBAL_STYLES } from "@src/styles";

export const STYLES: Record<string, React.CSSProperties> = {
  header: {
    textAlign: "center",
    height: 96,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "transparent",
  },
  content: {
    minHeight: 120,
    lineHeight: "60px",
  },
  textError: GLOBAL_STYLES.text.error,
  footer: {
    textAlign: "center",
  },
};
