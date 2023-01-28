/** @jsxImportSource @emotion/react */
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { regions } from '../../constants/select'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            //   maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            // width: 50,
        },
    },
};


interface Props { }


interface Props {
    region: string,
    onChange: (region: string) => void;
}

export const RegionSelect: React.FC<Props> = ({ region, onChange }) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };
    useEffect(() => {
        regions.sort((a, b) => a.display.localeCompare(b.display))
    }, [])
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel >region</InputLabel>
                <Select
                    value={region}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    MenuProps={MenuProps}
                >
                    {regions.map((region, i) => (
                        <MenuItem key={i} value={region.value}>
                            <ListItemText primary={`${region.display}`} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default RegionSelect;


