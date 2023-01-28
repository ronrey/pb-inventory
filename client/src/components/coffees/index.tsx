/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from "@mui/material";
import { styles } from "./styles";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Coffee } from '../coffee';
import { CoffeeInput } from "../coffeeInput";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { EnhancedTable } from './enhancedTable';
import { BottomNav } from '../bottomNav'
interface TotalCoffees {
  totalCoffees: string;
}
interface GetCoffees {
  getCoffees: Coffee[];
}

const REFREASH_RATE_COFFEE_COUNT = 1000;
const REFREASH_RATE_COFFEES = 1000;


interface Price {
  measurement: string
  quantity: number
  price: number
}

interface Coffee {
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
  const REMOVE_COFFEE = gql`
    mutation RemoveCoffee($id: ID) {
      removeCoffee(id: $id) {
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
  const [coffee, setCoffee] = useState<Coffee | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [deletee, setDeletee] = useState<Coffee | null>(null);
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
  const [removeCoffee] = useMutation(REMOVE_COFFEE, {
    onCompleted(data) {
      debugger
      console.log(`remove completed sucessfully`)
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
  const handleRemoveCoffee = () => {
    if (deletee)
      removeCoffee({
        variables: {
          id: deletee._id,
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
    const c = coffees.find((coffee) => coffee._id === _id);
    return c ? c : null;
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
  const handleDeleteClick = (_id: string) => {
    setDeletee(getCoffee(_id));
    setOpen(true)
    console.log(`hande delete ${_id}`)
  }
  const handleOKedDelete = () => {
    handleRemoveCoffee();
    setOpen(false);
    setDeletee(null);
  }
  const renderDeleteAlert = () => {
    if (!deletee) return null;
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>Delete Coffee</DialogTitle>
        <DialogContent dividers>
          {`Do you really want to delete coffee with key = ${deletee.key}`}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => { setOpen(false) }}>
            No
          </Button>
          <Button onClick={handleOKedDelete}>yes</Button>
        </DialogActions>
      </Dialog>
    )
  }
  const renderEnhancedTable = () => {
    return (
      <EnhancedTable data={coffees} onDeleteClick={handleDeleteClick} onRowClick={handleCoffeeClick} />
    )

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
        {renderEnhancedTable()}
      </div>
    )
  }
  return (
    <div css={styles.container}>
      {renderDeleteAlert()}
      {coffee ? renderCoffee() : renderCoffees()}
      <BottomNav me='coffees' />
    </div>
  );
};
