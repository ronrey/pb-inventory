/** @jsxImportSource @emotion/react */
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { roasts } from '../../constants/select'
const MenuProps = {
    PaperProps: {
        style: {
            //   maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            // width: 50,
        },
    },
};
interface Props {
    roast: string,
    onChange: (roast: string) => void;
}
export const RoastSelect: React.FC<Props> = ({ roast, onChange }) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel >roast</InputLabel>
                <Select
                    value={roast}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    MenuProps={MenuProps}
                >
                    {roasts.map((roast, i) => (
                        <MenuItem key={i} value={roast.value}>
                            <ListItemText primary={`${roast.display}`} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default RoastSelect;


