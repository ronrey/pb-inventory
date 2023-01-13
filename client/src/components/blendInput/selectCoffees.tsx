/** @jsxImportSource @emotion/react */
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useLazyQuery, gql } from "@apollo/client";
import { useEffect, useState } from 'react';
interface Coffee {
    _id: string
    key: string
    region: string
    roast: string
    state: string
}
interface GetCoffees {
    getCoffees: Coffee[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


interface Props {
    coffeeIDs: string[],
    onChange: (coffeeIDs: string[]) => void;
}

export const SelectCoffees: React.FC<Props> = ({ coffeeIDs, onChange }) => {
    const GET_COFFEES = gql`
    query GetCoffees {
      getCoffees {
        _id
        key
        region
        roast
        state
      }
    }
  `;
    const [getCoffees] = useLazyQuery<GetCoffees>(GET_COFFEES, {
        fetchPolicy: "cache-and-network",
        onCompleted: (data) => {
            setCoffees(data.getCoffees);
        },
        onError: (err) => {
            debugger;
        },
    });
    const [coffees, setCoffees] = useState<Coffee[]>([]);
    useEffect(() => {
        getCoffees();
    }, [getCoffees]);
    const getCoffee = (_id: string) => {
        return coffees.find((coffee, i) => coffee._id === _id)
    }
    const handleChange = (event: SelectChangeEvent<typeof coffeeIDs>) => {
        //  coffeeIDs
        const {
            target: { value },
        } = event;
        onChange(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Coffees</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={coffeeIDs}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => {
                        const coffeeIDs = selected.map((select) => getCoffee(select));
                        const coffeeDescs = coffeeIDs.map((coffee) =>
                            `${coffee?.key} - ${coffee?.region.substring(0, 3)} ${coffee?.roast.substring(0, 3)}`)

                        return coffeeDescs.join(', ')
                    }}
                    MenuProps={MenuProps}
                >
                    {
                        coffees.length > 0 ?
                            coffees.map((coffee, i) => (
                                <MenuItem key={i} value={coffee._id}>
                                    <Checkbox checked={coffeeIDs.indexOf(coffee._id) > -1} />
                                    <ListItemText primary={`${coffee.key} - ${coffee.region} ${coffee.roast}`} />
                                </MenuItem>
                            )) : null}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectCoffees;