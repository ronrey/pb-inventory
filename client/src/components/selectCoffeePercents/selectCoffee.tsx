/** @jsxImportSource @emotion/react */
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLazyQuery, gql } from "@apollo/client";
import { useEffect, useState } from 'react';
interface Coffee {
    key: number
    _id: string
    region: string
    roast: string
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
    coffeeId: string,
    onChange: (coffeeId: string) => void;
}
export const SelectCoffee: React.FC<Props> = ({ coffeeId, onChange }) => {
    const GET_COFFEES = gql`
    query GetCoffees {
      getCoffees {
        _id
        key
        region
        roast
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
    const handleChange = (event: SelectChangeEvent) => {
        onChange(
            event.target.value
        );
    };
    const renderSelecter = () => {
        const coffee = getCoffee(coffeeId);
        return (coffees.length > 0 ?
            (<FormControl style={{ minWidth: 178 }}>
                <InputLabel id="demo-multiple-checkbox-label">Coffee</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={coffeeId}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(coffeeId) => {
                        if (coffeeId === '') debugger
                        return `${coffee?.key} - ${coffee?.region.substring(0, 6)} ${coffee?.roast.substring(0, 6)}`
                    }
                    } MenuProps={MenuProps}
                >
                    <MenuItem key={-1} value={''}>
                        <ListItemText primary={`select coffee`} />
                    </MenuItem>
                    {
                        coffees.length > 0 ?
                            coffees.map((coffee, i) => (
                                <MenuItem key={i} value={coffee._id}>
                                    <ListItemText primary={`${coffee.key} - ${coffee.region} ${coffee.roast}`} />
                                </MenuItem>
                            )) : null}
                </Select>
            </FormControl>) : null
        );
    }
    return (
        <div>
            {
                renderSelecter()
            }
        </div>
    );
}

export default SelectCoffee;