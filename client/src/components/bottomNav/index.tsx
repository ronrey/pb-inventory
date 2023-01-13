/** @jsxImportSource @emotion/react */
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from './styles'

import BlenderIcon from '@mui/icons-material/Blender';
import CoffeeIcon from '@mui/icons-material/Coffee';

interface Props {
    me: string
}


export const BottomNav: React.FC<Props> = ({ me }) => {
    const [value, setValue] = useState(0);
    const navagate = useNavigate();
    useEffect(() => {
        switch (me) {
            case 'blends':
                setValue(0)
                break;
            case 'coffees':
                setValue(1)
                break;

            default:
                break;
        }
    })
    const onChange = () => {

    }
    return (
        <div css={styles.container}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Blends" icon={<BlenderIcon />} onClick={() => { navagate('/blends') }} />
                <BottomNavigationAction label="Coffees" icon={<CoffeeIcon />} onClick={() => { navagate('/coffees') }} />
            </BottomNavigation>
        </div>
    )
};