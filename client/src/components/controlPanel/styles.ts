import { createStyles } from "../emotion-styles";
export const styles = createStyles({
  container: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    margin: "auto",
    width: 388,
    marginBottom: 8,
    marginTop: 8,
  },
  title: {
    margin: "auto",
    textAlign: 'center'
  },
  outputs: {
    display: "flex",
    justifyContent: "space-around",
    margin: "auto",
    width: "90%",
  },
  labelAndOutput: {
    display: "flex",
    margin: 8,
  },
  label: { marginRight: 4, fontSize: "1.0rem", fontWeight: "bold" },
  output: { fontSize: "1.0rem" },
  controls: {
    display: "flex",
    flexFlow: "column wrap",
    //justifyContent: "center",
    border: 'solid'
  },
  controlsContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    padding: "8px 8px 4px 8px",
    margin: 12,
    marginBottom: 8,
    width: "94%",
  },
  controlLabel: {
    fontSize: "1rem",
  },
  control: {
    display: "flex",
    flexFlow: "column",
    margin: "4px 2px",
    padding: 8,
    minWidth: 322,
    borderBottom: "solid thin",
  },
  display: {
    display: "flex",
    flexFlow: "column",
    padding: 8,
    minWidth: 322,
    margin: "auto",
    width: "90%",
  },
  text: {
    textAlign: "center",
  },
});
