import { createStyles } from "../emotion-styles";
import { blue, grey, lightBlue } from "@mui/material/colors";

export const styles = createStyles({
  container: {
    // backgroundColor: blue[100],
    padding: "0px 4px 0px 4px",
    height: "100%",
  },
  text: {
    fontSize: "2.5rem",
    textAlign: "center",
  },
  property: {},
  progress: {
    zIndex: 2,
    position: "fixed",
    top: "50%",
    left: "50%",
  },
  onOffContainer: {
    display: "flex",
    marginTop: 16,
    marginBottom: 8,
    justifyContent: "flex-end",
  },
  label: { marginRight: 8 },
  input: { marginRight: 8, width: 60 },
  output: { color: "red" },
  labelAndOutput: {
    display: "flex",
    margin: `8px 0`,
  },
  button: {
    marginRight: 8,
  },
  feedButton: {
    // height: 56,
    //  marginLeft: 8,
  },
  outputs: {
    display: "flex",
    justifyContent: "space-around",
    margin: 8,
    padding: 8,
  },
  Controls: {
    padding: "8px 8px 4px 8px",

    display: "flex",
    flexFlow: "column",
    height: "100%",
  },
  controlText: {
    fontSize: ".9rem",
    textAlign: "center",
    paddingTop: 4,
    marginRight: 8,
  },
});
