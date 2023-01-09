/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, Fab, Input, Paper, TextField, Typography } from "@mui/material";
import { styles } from "./styles";
import { useMutation, useLazyQuery, gql } from "@apollo/client";

import { useNavigate } from "react-router-dom";


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
  const ADD_COFFEE = gql`
  mutation AddCoffee($coffee:CoffeeInput) {
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


  const [addCoffee] = useMutation(ADD_COFFEE, {
    onCompleted(data) {
      debugger
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
      debugger
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


  const onAddCoffee = () => {
    const c = 'createCoffeeInput()';
    console.log(c)
    debugger
    addCoffee({
      variables: {
        coffee: c,
      },
    });
  };
  const handleNavagateClick = () => {
    navagate('/coffee')
  };

  /* 
  const handleParagraphChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParagraphs([event.target.value]);
  };
  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };
  const handleDecafChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDecaf(event.target.checked);
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };
  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(event.target.value);
  };
  const handleRoastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoast(event.target.value);
  };
  const handleMouthfeelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMouthfeel(parseFloat(event.target.value));
  };
  const handleAcidityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcidity(parseFloat(event.target.value));
  };
  const handleCaramelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaramel(parseFloat(event.target.value));
  };
  const handleFlowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlower(parseFloat(event.target.value));
  };
  const handleFruitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFruit(parseFloat(event.target.value));
  };

  const handleFlavorsChange = (flavs: string[]) => {
  };
  const handleQualitiesChange = (qual: string[]) => {
    setQualities(qual);
  };
  const handlePriceChange = (prices: Price[]) => {
    setPrices(prices);
  };

  const renderGeneral = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <Typography variant="h6" css={styles.sectionLabel}>general</Typography>
        <div css={styles.generalContainer}>
          <FormControlLabel css={styles.decafLabelSwitch} label="Decaf" control={
            <Switch size="small" checked={decaf} onChange={handleDecafChange} />
          } />
          <TextField label="key" css={styles.generalTextField} value={key} onChange={handleKeyChange} />
          <TextField label="state" css={styles.generalTextField} value={state} onChange={handleStateChange} />
          <TextField label="region" css={styles.generalTextField} value={region} onChange={handleRegionChange} />
          <TextField label="roast" css={styles.generalTextField} value={roast} onChange={handleRoastChange} />
        </div>
      </Paper>

    )
  }
  const renderPrices = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <Typography variant="h6" css={styles.sectionLabel}>prices</Typography>
        <div css={styles.generalContainer}>
          <PriceList list={prices} onChange={handlePriceChange} title="prices" />

        </div>
      </Paper>
    )
  }
  const renderDescriptions = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <Typography variant="h6" css={styles.sectionLabel}>descriptions</Typography>
        <div css={styles.generalContainer}>
          <StringList list={flavors} onChange={handleFlavorsChange} title="flavors" />
          <StringList list={qualities} onChange={handleQualitiesChange} title="qualities" />
        </div>
        <TextField label="paragraph"
          multiline
          rows={4}
          css={styles.paragraphTextField}
          value={paragraphs[0]}
          onChange={handleParagraphChange} />

      </Paper>
    )
  }
  const renderFlavorProfile = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <Typography variant="h6" css={styles.sectionLabel}>flavor profile</Typography>
        <div css={styles.flavorProfileContainer}>
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .01,
            step: .01,

          }} label="mouthfeel" value={mouthfeel} onChange={handleMouthfeelChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .01,
            step: .01,

          }} label="acidity" value={acidity} onChange={handleAcidityChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .01,
            step: .01,

          }} label="caramel" value={caramel} onChange={handleCaramelChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .01,
            step: .01,

          }} label="fruit" value={fruit} onChange={handleFruitChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .01,
            step: .01,

          }} label="flower" value={flower} onChange={handleFlowerChange} type='number' />
        </div>
      </Paper>

    )
  } */
  const renderCoffees = () => {
    return (<div>
      {coffees.map((coffee, i) => (
        <div>
          {coffee._id}
        </div>
      ))}
    </div>)
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
        <Fab variant="extended" color='primary' onClick={handleNavagateClick} >
          coffee
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
      {renderCoffees()}

      {/* renderGeneral()}

      {renderFlavorProfile()}
      {renderPrices()}
      {renderDescriptions() */}


    </Paper>
  );
};
