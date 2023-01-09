import { createStyles } from "../emotion-styles";

export const styles = createStyles({
  container: {
    padding: "8px 8px 4px 8px",
  },
  text: {
    textAlign: "center",
  },
  property: {},
  progress: {
    zIndex: 2,
    position: "fixed",
    top: "50%",
    left: "50%",
  },
  buttons: {
    display: "flex",
    justifyContent: "right",
  },
  label: { marginRight: 8 },
  output: { color: "red" },
  labelAndOutput: {
    display: "flex",
  },
  button: {
    marginRight: 8,
  },
  outputs: {
    display: "flex",
    justifyContent: "space-around",
    margin: 8,
    padding: 8,
  },
});
