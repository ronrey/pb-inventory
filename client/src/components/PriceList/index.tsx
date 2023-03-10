/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  List,
  ListItem,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { styles } from "./styles";
import Switch from "@mui/material/Switch";
import { cloneDeep } from "@apollo/client/utilities";
interface Props {}
interface Price {
  measurement: string;
  quantity: number;
  price: number;
}
interface Props {
  list: Price[];
  title: string;
  onChange: (list: Price[]) => void;
}

const protoPrice = {
  price: 0,
  quantity: 0,
  measurement: "lbs",
};

const measurementList = [
  {
    value: "lbs",
    display: "lbs",
  },
  {
    value: "ozs",
    display: "ozs",
  },
  {
    value: "kilos",
    display: "kilos",
  },
];
export const PriceList: React.FC<Props> = ({ list, onChange, title }) => {
  const [edit, setEdit] = useState<Price>({ ...protoPrice });
  const handleListItemChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const newList = cloneDeep(list);
    const item = newList[i];
    debugger;
    switch (key) {
      case "price":
        item.price = parseFloat(event.target.value);
        break;
      case "quantity":
        item.quantity = parseInt(event.target.value);
        break;
      case "measurement":
        item.measurement = event.target.value;
        break;
      default:
        debugger;
    }

    onChange(newList);
  };
  const handleAdd = () => {
    //debugger
    const newList = [...list];
    if (edit !== null) newList.push(edit);

    setEdit({ ...protoPrice });
    onChange(newList);
  };
  const handleDelete = (i: number) => {
    //debugger
    const newList = [...list];
    newList.splice(i, 1);
    onChange(newList);
  };
  const handleEditChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newEdit = { ...edit };
    switch (key) {
      case "price":
        newEdit.price = parseFloat(event.target.value);
        break;
      case "quantity":
        newEdit.quantity = parseFloat(event.target.value);
        break;
      case "measurement":
        newEdit.measurement = event.target.value;
        break;
      default:
        debugger;
    }
    setEdit(newEdit);
  };
  const handleEditMeasurementChange = (event: SelectChangeEvent) => {
    const newEdit = { ...edit };

    newEdit.measurement = event.target.value;

    setEdit(newEdit);
  };

  const handleListItemMeasurementChange = (
    i: number,
    event: SelectChangeEvent
  ) => {
    const newList = [...list];
    const item = newList[i];
    item.measurement = event.target.value;
    onChange(newList);
  };

  const renderList = () => {
    return (
      <div css={styles.itemContainer}>
        {list.map((price: Price, i: number) => (
          <div css={styles.item} key={i}>
            <span style={{ marginRight: 4 }}>$</span>
            <Input
              css={styles.editInput}
              value={price.price}
              onChange={(e) => handleListItemChange("price", e, i)}
              type="number"
              inputProps={{
                min: 0.01,
                step: 0.01,
              }}
            />
            <Typography css={styles.for}>for</Typography>
            <Input
              css={styles.editInput}
              value={price.quantity}
              onChange={(e) => handleListItemChange("quantity", e, i)}
              type="number"
            />
            <Select
              value={price.measurement}
              onChange={(e) => handleListItemMeasurementChange(i, e)}
            >
              {measurementList.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                  {item.display}
                </MenuItem>
              ))}
            </Select>

            <Button onClick={() => handleDelete(i)} size="small">
              <DeleteIcon fontSize="small" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const renderEdit = () => {
    return (
      <div css={styles.editContainer}>
        <span style={{ marginRight: 4 }}>$</span>
        <Input
          css={styles.editInput}
          type="number"
          inputProps={{
            min: 0.01,
            step: 0.01,
          }}
          value={edit.price}
          onChange={(e) => handleEditChange("price", e)}
        />
        <Typography css={styles.for}>for</Typography>
        <Input
          css={styles.editInput}
          type="number"
          value={edit.quantity}
          onChange={(e) => handleEditChange("quantity", e)}
        />

        <Select value={edit.measurement} onChange={handleEditMeasurementChange}>
          {measurementList.map((item, i) => (
            <MenuItem key={i} value={item.value}>
              {item.display}
            </MenuItem>
          ))}
        </Select>
        <Button size="small">
          {true ? (
            <AddIcon onClick={handleAdd} fontSize="small" />
          ) : (
            <NotInterestedIcon fontSize="small" color="error" />
          )}
        </Button>
      </div>
    );
  };
  return (
    <Paper elevation={16} css={styles.container}>
      <Typography css={styles.title} variant="h6">
        {title}
      </Typography>
      {renderEdit()}
      {renderList()}
    </Paper>
  );
};
