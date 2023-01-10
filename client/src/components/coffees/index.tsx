/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, Fab, Input, Paper, TextField, Typography } from "@mui/material";
import { styles } from "./styles";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Coffee } from '../coffee';
import { CoffeeInput } from "../coffeeInput";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
interface TotalCoffees {
  totalCoffees: string;
}
interface GetCoffees {
  getCoffees: Coffee[];
}

const REFREASH_RATE_COFFEE_COUNT = 1000;
const REFREASH_RATE_COFFEES = 1000;

const protoCoffee = {
  "state": "instock",
  "key": "3",
  "decaf": true,
  "prices": [
    {
      "measurement": "lbs",
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
interface CoffeeInput {
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
export const Coffees: React.FC<Props> = () => {


  const UPDATE_COFFEE = gql`
  mutation UpdateCoffee($item:CoffeeInput) {
  updateCoffee(item:$item) {
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
  const GET_COFFEES = gql`
query GetCoffees {
  getCoffees {
    acidity
    _id
    caramel
    createdAt
    decaf
    flavors
    flower
    fruit
    key
    mouthfeel
    paragraphs
    prices {
      measurement
      price
      quantity
    }
    qualities
    region
    roast
    state
    updatedAt
  }
}
  `;
  const navagate = useNavigate();
  const [coffeeCount, setCoffeeCount] = useState('');
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [coffee, setCoffee] = useState<Coffee | null>(null)
  const [updateCoffee] = useMutation(UPDATE_COFFEE, {
    onCompleted(data) {
      console.log(`update completed sucessfully`)
      setCoffee(null);
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
      setTimeout(() => totalCoffees(), REFREASH_RATE_COFFEE_COUNT);
    },
    onError: (err) => {
      debugger;
    },
  });
  const [getCoffees] = useLazyQuery<GetCoffees>(GET_COFFEES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setCoffees(data.getCoffees);
      setTimeout(() => getCoffees(), REFREASH_RATE_COFFEES);
    },
    onError: (err) => {
      debugger;
    },
  });
  useEffect(() => {
    totalCoffees();
    getCoffees();
  }, [totalCoffees, getCoffees]);
  const onUpdateCoffee = () => {
    updateCoffee({
      variables: {
        item: createCoffeeData(),
      },
    });
  };
  const createPrices = (coffee: Coffee) => {
    return coffee.prices.map((price) => ({ price: price.price, measurement: price.measurement, quantity: price.quantity }))
  }
  const createCoffeeData = () => {
    return coffee ? {
      _id: coffee._id,
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

  const getCoffee = (_id: string) => {
    return coffees.find((coffee) => coffee._id === _id);
  };
  const handleCoffeeChange = (coffee: Coffee) => {
    setCoffee(coffee);
  };

  const handleNavagateClick = () => {
    navagate('/coffee')
  };
  const handleCoffeeClick = (_id: string) => {
    console.log('coffee clicked')
    const c = getCoffee(_id);
    if (c)
      setCoffee(c);
  };
  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">region</TableCell>
              <TableCell align="center">roast</TableCell>
              <TableCell align="center">key</TableCell>
              <TableCell align="center">decaf</TableCell>
              <TableCell align="center">state</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coffees.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleCoffeeClick(row._id)}>
                <TableCell component="th" align='center' scope="row" onClick={() => console.log('clicked')}> {row.region} </TableCell>
                <TableCell align="center">{row.roast}</TableCell>
                <TableCell align="center">{row.key}</TableCell>
                <TableCell align="center">{row.decaf ? 'true' : 'false'}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  const renderCoffee = () => {
    if (coffee !== null)
      return (
        <div>
          {renderButtons()}
          <CoffeeInput coffee={coffee} onChange={handleCoffeeChange} />
        </div>
      )
    return null;
  }
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
  const renderButtons = () => {
    return (<div css={styles.buttonContainer}>
      <Button
        css={styles.button}
        variant="contained"
        size="small"
        color="primary"
        onClick={() => {
          onUpdateCoffee();
        }}
      >
        update
      </Button>
      <Button
        css={styles.button}
        variant="contained"
        size="small"
        color="primary"
        onClick={() => {
          setCoffee(null)
        }}
      >
        close
      </Button>
    </div>)
  }
  const renderCoffees = () => {
    return (
      <div>
        <div css={styles.headerContainer}>
          <Typography css={styles.title} variant="h6">Coffees</Typography>
          <Button color="primary" onClick={handleNavagateClick} >
            <AddCircleOutlineIcon />add
          </Button>
        </div>
        {renderDisplay()}
        {renderTable()}
      </div>
    )
  }
  return (
    <Paper elevation={16} css={styles.container}>
      {coffee ? renderCoffee() : renderCoffees()}

      {/* renderGeneral()}

      {renderFlavorProfile()}
      {renderPrices()}
      {renderDescriptions() */}


    </Paper>
  );
};
