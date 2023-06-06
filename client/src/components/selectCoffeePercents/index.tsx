/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import { styles } from "./styles";
import { SelectCoffee } from "./selectCoffee";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { cloneDeep } from "lodash";
interface BlendCoffee {
  coffee_id: string;
  percentage: number;
}
interface Props {
  items: BlendCoffee[];
  onChange: (items: BlendCoffee[]) => void;
}
export const SelectCoffeePercents: React.FC<Props> = ({ items, onChange }) => {
  const [edit, setEdit] = useState<BlendCoffee>({
    coffee_id: "",
    percentage: 0.5,
  });

  const handleCoffeeChange = (id: string, i: number) => {
    const newItems = cloneDeep(items);
    newItems[i].coffee_id = id;
    onChange(newItems);
  };
  const handleEditCoffeeChange = (id: string) => {
    const newEdit = { ...edit };
    newEdit.coffee_id = id;
    setEdit(newEdit);
  };
  const handleEditPercentageChange = (percentage: number) => {
    const newEdit = { ...edit };
    newEdit.percentage = percentage;
    setEdit(newEdit);
  };
  const handlePercentageChange = (percentage: number, i: number) => {
    const newItems = cloneDeep(items);
    newItems[i].percentage = percentage;
    onChange(newItems);
  };
  const handleDelete = (i: number) => {
    const newItems = cloneDeep(items);
    newItems.splice(i, 1);
    onChange(newItems);
  };
  const renderItems = () => {
    return (
      <div css={styles.container}>
        {items.map((item, i) => (
          <div css={styles.coffeePercentContainer} key={i}>
            <Button
              size="small"
              color="primary"
              onClick={() => handleDelete(i)}
            >
              <DeleteIcon fontSize="small" />
            </Button>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    );
  };
  const renderItem = (item: BlendCoffee, i: number) => {
    const { coffee_id, percentage } = item;
    return (
      <div css={styles.coffeItemsContainer} key={i}>
        <SelectCoffee
          coffeeId={item.coffee_id}
          onChange={(cid) => handleCoffeeChange(cid, i)}
        />
        <TextField
          value={percentage}
          type="number"
          inputProps={{
            min: 0.1,
            step: 0.1,
            max: 1,
          }}
          css={styles.percentageField}
          onChange={(event) => {
            handlePercentageChange(parseFloat(event.target.value), i);
          }}
        />
        <Typography style={{ margin: 4 }} variant="subtitle2">
          %
        </Typography>
      </div>
    );
  };
  const renderEditItem = () => {
    const { coffee_id, percentage } = edit;
    return (
      <div css={styles.coffeItemsContainer}>
        <Button>
          <AddIcon onClick={handleAdd} fontSize="small" />
        </Button>
        <SelectCoffee coffeeId={coffee_id} onChange={handleEditCoffeeChange} />

        <TextField
          value={percentage}
          type="number"
          inputProps={{
            min: 0.1,
            step: 0.1,
            max: 1,
          }}
          css={styles.percentageField}
          onChange={(event) => {
            handleEditPercentageChange(parseFloat(event.target.value));
          }}
        />
        <Typography style={{ margin: 4 }} variant="subtitle2">
          %
        </Typography>
      </div>
    );
  };
  const handleAdd = () => {
    const newItems = cloneDeep(items);
    if (edit !== null) newItems.push(edit);

    setEdit({ coffee_id: "", percentage: 0.5 });
    onChange(newItems);
  };
  return (
    <div>
      {renderEditItem()}
      {renderItems()}
    </div>
  );
};
