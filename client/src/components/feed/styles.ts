import { createStyles } from "../emotion-styles";
//import { blue, grey, lightBlue } from "@mui/material/colors";

export const styles = createStyles({
  container: {
    padding: 8,
  },
  text: {
    textAlign: "center",
  },
  cw: {
    marginLeft: 12,
    paddingTop: 8,
  },
  property: {},
  settingsContainer: {
    padding: 8,
  },
  progress: {
    zIndex: 2,
    position: "fixed",
    top: "50%",
    left: "50%",
  },
  label: { marginRight: 8 },
  input: { marginRight: 8, width: 80 },
  output: { color: "red" },
  labelAndOutput: {
    display: "flex",
    margin: 8,
  },
  InputAndButton: {
    display: "flex",
    margin: `8px 0`,
  },
  button: {
    marginRight: 8,
  },
  feedButton: {
    marginLeft: 8,
  },
  outputs: {
    display: "flex",
    justifyContent: "space-around",
    margin: 8,
    padding: 8,
  },
  onOffContainer: {
    display: "flex",
    marginTop: 8,
    marginBottom: 8,
    justifyContent: "flex-end",
  },
  controls: {
    display: "flex",
    flexFlow: "column",
  },
  controlText: {
    fontSize: ".9rem",
    textAlign: "center",
    paddingTop: 4,
    marginRight: 8,
  },
});
