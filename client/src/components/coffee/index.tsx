/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { styles } from "./styles";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CoffeeInput } from "../coffeeInput";
import ListIcon from '@mui/icons-material/List';
interface Props {

}
interface TotalCoffees {
  totalCoffees: string;
}
const REFREASH_RATE_OZS = 1000;

const protoCoffee = {
  "_id": "",
  "state": "instock",
  "key": 1,
  "decaf": false,
  "prices": [
    {
      "measurement": "lbs",
      "quantity": 1,
      "price": 15
    },
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
    ""
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
interface CoffeeInterface {
  _id: string
  state: string
  key: number
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
  const ADD_COFFEE = gql`
  mutation AddCoffee($item:CoffeeInput) {
  addCoffee(item:$item) {
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

  const createPrices = (coffee: CoffeeInterface) => {
    return coffee.prices.map((price) => ({ price: price.price, measurement: price.measurement, quantity: price.quantity }))
  }
  const createCoffeeData = () => {
    return coffee ? {
      state: coffee.state,
      key: coffee.key,
      decaf: coffee.decaf,
      prices: createPrices(coffee),
      mouthfeel: coffee.mouthfeel,
      acidity: coffee.acidity,
      caramel: coffee.caramel,
      fruit: coffee.fruit,
      flower: coffee.flower,
      flavors: coffee.flavors,
      qualities: coffee.qualities,
      region: coffee.region,
      roast: coffee.roast,
      paragraphs: coffee.paragraphs
    } : null;
  };


  const onAddCoffee = () => {
    const c = createCoffeeData();
    console.log(c)
    addCoffee({
      variables: {
        item: c,
      },
    });
  };
  const handleNavagateClick = () => {
    navagate('/coffees')
  };
  const handleCoffeeChange = (coffee: CoffeeInterface) => {
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
        <Button color="primary" onClick={handleNavagateClick} >
          <ListIcon />coffees
        </Button>
      </div>
      {renderDisplay()}
      <Button
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
