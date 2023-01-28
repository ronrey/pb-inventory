import { createStyles } from "../emotion-styles";
export const styles = createStyles({
  container: {
    display: "flex",
    flexFlow: "column wrap",
    margin: 8,
    marginTop: 8,
  },
  inputsContainer: {
    display: 'flex',
    flexFlow: 'column wrap',
    margin: 8,
    padding: 12
  },
  textField: {
    width: 80,
  },
  percentageField: {
    width: 60,
  },
  customItems: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 4,
    padding: 8
  },
  editCustomItems: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 8,
    // padding: 20
  },
  customItem: {
    display: 'flex',
    flexFlow: 'row',
    marginBottom: 8,
  },
  coffeItemsContainer: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
  }
});
