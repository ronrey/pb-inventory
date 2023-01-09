/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, Fab, Input, Paper, TextField, Typography } from "@mui/material";
import { styles } from "./styles";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { StringList } from '../StringList';
import { PriceList } from '../PriceList'
import { useNavigate } from "react-router-dom";
import { CoffeeInput } from "../coffeeInput";

interface Props {

}
interface TotalCoffees {
  totalCoffees: string;
}
interface AddCoffee {
  addCoffee(item: Coffee): Status
}
const REFREASH_RATE_OZS = 1000;

const protoCoffee = {
  "_id": "",
  "state": "instock",
  "key": "31",
  "decaf": true,
  "prices": [
    {
      "measurement": "lbs",
      "quantity": 2,
      "price": 12
    },
    {
      "measurement": "ozs",
      "quantity": 2,
      "price": 12
    }
  ],
  "mouthfeel": 0.5,
  "acidity": 0.5,
  "caramel": 0.5,
  "fruit": 0.5,
  "flower": 0.5,
  "flavors": [
    "crisp",
    "fresh"
  ],
  "qualities": [
    "cheap",
    "bold"
  ],
  "region": "mexico",
  "roast": "vienna",
  "paragraphs": [
    "paragrph"
  ]
}
interface Price {
  measurement: string
  quantity: number
  price: number
}
interface Status {
  success: boolean
  code: string
  message: string
}
interface Coffee {
  _id: string
  state: string
  key: string
  decaf: boolean
  prices: Price[]
  mouthfeel: number
  acidity: number
  caramel: number
  fruit: number
  flower: number
  flavors: string[]
  qualities: string[]
  region: string
  roast: string
  paragraphs: string[]
}


interface Props { }
export const Coffee: React.FC<Props> = () => {
  debugger
  const ADD_COFFEE = gql`
  mutation AddCoffee($coffee:Coffee) {
  addCoffee(item:$coffee) {
    code
    message
    success
  }
}
  `;
  const TOTAL_COFFEES = gql`
    query totalCoffees {
      totalCoffees
    }
  `;
  const navagate = useNavigate();
  const [coffeeCount, setCoffeeCount] = useState('');
  const [coffee, setCoffee] = useState(protoCoffee);
  const [addCoffee] = useMutation(ADD_COFFEE, {
    onCompleted(data) {
      // setShowProgress(false);
    },
    onError: (err) => {
      //  setShowProgress(false);
      debugger;
    },
  });
  const [totalCoffees] = useLazyQuery<TotalCoffees>(TOTAL_COFFEES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setCoffeeCount(data.totalCoffees);
      setTimeout(() => totalCoffees(), REFREASH_RATE_OZS);
    },
    onError: (err) => {
      debugger;
    },
  });

  useEffect(() => {
    totalCoffees();
  }, [totalCoffees,]);

  const createCoffeeInput = () => {
    return {
      /*     state,
          key,
          decaf,
          prices,
          mouthfeel,
          acidity,
          caramel,
          fruit,
          flower,
          flavors,
          qualities,
          region,
          roast,
          paragraphs */
    }
  }



  const onAddCoffee = () => {
    const c = createCoffeeInput();
    console.log(c)
    addCoffee({
      variables: {
        coffee: c,
      },
    });
  };
  const handleNavagateClick = () => {
    navagate('/coffees')
  };
  const handleCoffeeChange = (coffee: Coffee) => {
    debugger
    setCoffee(coffee);
  };

  const renderDisplay = () => {
    return (
      <div css={styles.outputs}>
        <div css={styles.labelAndOutput}>
          <Typography css={styles.label} color="primary" variant="h6">
            Coffee count:
          </Typography>
          <Typography css={styles.output} color="secondary" variant="h6">
            {`${coffeeCount}`}
          </Typography>
        </div>


      </div>

    )
  }
  return (
    <Paper elevation={16} css={styles.container}>
      <div css={styles.headerContainer}>
        <Typography css={styles.title} variant="h6">Coffee</Typography>
        <Fab variant="extended" color="primary" onClick={handleNavagateClick} >
          coffees
        </Fab>
      </div>
      {renderDisplay()}
      <Button
        fullWidth
        css={styles.fullWidthButton}
        variant="contained"
        size="small"
        color="primary"
        onClick={() => {
          onAddCoffee();
        }}
      >
        add
      </Button>
      <CoffeeInput coffee={coffee} onChange={handleCoffeeChange} />


    </Paper>
  );
};
