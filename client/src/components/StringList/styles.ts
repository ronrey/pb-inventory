import { createStyles } from "../emotion-styles";
export const styles = createStyles({
  container: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    // margin: "auto",
    // width: 388,
    margin: 8,
    padding: 8
  },
  title: {
    //margin: "auto",
    //textAlign: 'center'
  },
  generalTextField: {
    width: 100,
    //  margin: 8,
    // padding: 0
  },
  paper: {
    margin: 8
  },
  editContainer: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    // padding: 8
  },
  itemContainer: {

  },
  editInput: {
    width: 100
  }
});
