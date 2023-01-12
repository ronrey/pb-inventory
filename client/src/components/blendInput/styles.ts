import { createStyles } from "../emotion-styles";
export const styles = createStyles({
  container: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: 'center',
    justifyContent: "center",
    margin: "auto",
    marginBottom: 8,
    marginTop: 8,
  },
  headerContainer: {
    //  width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
    marginTop: 8
  },
  title: {
    margin: "auto",
    textAlign: 'center'
  },
  outputs: {
    display: "flex",
    justifyContent: "space-around",
    margin: "auto",
    //    width: "90%",
  },
  labelAndOutput: {
    display: "flex",
    margin: 8,
  },
  label: { marginRight: 4, fontSize: "1.0rem", fontWeight: "bold" },
  output: { fontSize: "1.0rem" },

  flavorProfile: {
    margin: 8,
  },
  flavorProfileContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: 8,
  },

  generalContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: 8,
  },
  pricesContainer: {
    display: 'flex',
    flexFlow: 'column wrap',
    margin: 8,
  },
  generalTextField: {
    margin: 8,
  },
  textField: {
    margin: 8,
  },
  paragraphTextField: {
    // width: 400,
    margin: 8,
  },
  decafLabelSwitch: {
    margin: 8
  },
  sectionLabel: {
    margin: 8,
  },
  paper: {
    margin: 8,
    //   width: 440
  },
  fullWidthButton: {
    margin: '4px 4px ',
    width: '90%'
  }
});
