import { createStyles } from "../emotion-styles";
//import { blue, grey, lightBlue } from "@mui/material/colors";

export const styles = createStyles({
  container: {
    padding: 8,
  },
  text: {
    fontSize: "2.0rem",
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
    justifyContent: "space-evenly",
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
