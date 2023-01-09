/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, Input, Paper, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { styles } from "./styles";
import Switch from '@mui/material/Switch';
interface Props {

}
interface Props {
  list: string[];
  title: string;
  onChange: (list: string[]) => void;
}

export const StringList: React.FC<Props> = ({ list, onChange, title }) => {
  const [edit, setEdit] = useState('');

  const handleListItemChange = (value: string, i: number) => {
    const newList = [...list];
    newList[i] = value;
    onChange(newList)

    // setCarmel(parseFloat(event.target.value));
  };
  const handleAdd = () => {
    //debugger
    const newList = [...list];
    newList.push(edit);
    setEdit('');
    onChange(newList);
  };
  const handleDelete = (i: number) => {
    //debugger
    const newList = [...list];
    newList.splice(i, 1)
    onChange(newList);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(event.target.value);
  };

  const renderList = () => {
    return (
      <div css={styles.itemContainer} >
        {
          list.map((str, i) => (
            <div css={styles.itemContainer} key={i} >
              <Input
                key={i}
                margin='none'
                css={styles.generalTextField} value={list[i]}
                onChange={(event) => handleListItemChange(event.target.value, i)} />
              <Button

                size="small"
                color="primary"
                onClick={() => handleDelete(i)}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </div>
          ))
        }

      </div>

    )
  }
  const renderEdit = () => {
    return (
      <div css={styles.editContainer}  >
        <Input css={styles.editInput} value={edit} onChange={handleEditChange} />
        <Button

          size="small"

        >
          {edit.length > 0 ? <AddIcon onClick={handleAdd} fontSize="small" /> :
            <NotInterestedIcon fontSize="small" color="error" />}
        </Button>
      </div>

    )
  }
  return (
    <Paper elevation={16} css={styles.container}>
      <Typography css={styles.title} variant="h6">{title}</Typography>
      {renderEdit()}
      {renderList()}


    </Paper>
  );
};
