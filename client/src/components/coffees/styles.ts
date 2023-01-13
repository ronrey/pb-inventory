import { createStyles } from "../emotion-styles";
export const styles = createStyles({
  container: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: 'center',
    justifyContent: "center",
    margin: "auto",
    marginBottom: 8,
    marginTop: 60,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
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

  flavorProfile: {
    width: 100,
    margin: 8,
  },
  flavorProfileContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: 8,
  },

  generalContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: 8,
  },
  generalTextField: {
    width: 100,
    margin: 8,
  },
  paragraphTextField: {
    width: 400,
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
    width: 440
  },
  buttonContainer: {
    margin: '4px 4px ',
    display: 'flex',
    justifyContent: 'flex-end',
    //  border: 'solid'
    //  width: '90%'
  },
  button: {
    margin: '4px 4px ',
    //  width: '90%'
  },
  tableCell: {
    //  fontSize: '1rem'
  },
  tableHeadingCell: {
    fontSize: '.85rem'
  },
  tableRow: {
    borderBottom: '1.5px solid ',
    cursor: 'pointer'

  },
  tableHeadingRow: {
    borderBottom: '3px solid '
  },
  modalDlog: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'black',
    //color: 'white',
    border: '2px solid #000',
    p: 4,
  }
});
