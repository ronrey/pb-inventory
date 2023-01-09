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

interface Props {

}
interface TotalCoffees {
  totalCoffees: string;
}
interface AddCoffee {
  addCoffee(item: CoffeeInput): Status
}
const REFREASH_RATE_OZS = 1000;

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


interface Props { coffee?: Coffee }
export const Coffee: React.FC<Props> = (coffee) => {
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
  const navagate = useNavigate();
  const [coffeeCount, setCoffeeCount] = useState('');
  const [state, setState] = useState<string>('new');
  const [key, setKey] = useState<string>('3');
  const [decaf, setDecaf] = useState<boolean>(true);
  const [mouthfeel, setMouthfeel] = useState<number>(.01);
  const [acidity, setAcidity] = useState<number>(.01);
  const [caramel, setCaramel] = useState<number>(.01);
  const [fruit, setFruit] = useState<number>(.01);
  const [flower, setFlower] = useState<number>(.01);
  const [region, setRegion] = useState<string>('mexico');
  const [roast, setRoast] = useState<string>('vienna');
  const [paragraphs, setParagraphs] = useState<string[]>(['nre paragraph']);
  const [prices, setPrices] = useState<Price[]>([
    {
      "measurement": "lbs",
      "quantity": 2,
      "price": 12
    }
  ]);
  const [qualities, setQualities] = useState<string[]>([
    "cheap",
    "bold"
  ]);
  const [flavors, setFlavors] = useState<string[]>([
    "crisp",
    "fresh"
  ]);

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
      setTimeout(() => totalCoffees(), REFREASH_RATE_OZS);
    },
    onError: (err) => {
      debugger;
    },
  });

  useEffect(() => {
    totalCoffees();
  }, [totalCoffees,]);
  const renderInput = (key: string,) => {

  }


  const createCoffeeInput = () => {
    return {
      state,
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
      paragraphs
    }
  }



  const onAddCoffee = () => {
    const c = createCoffeeInput();
    console.log(c)
    debugger
    addCoffee({
      variables: {
        coffee: c,
      },
    });
  };
  const handleNavagateClick = () => {
    navagate('/coffees')
  };
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
      {renderGeneral()}

      {renderFlavorProfile()}
      {renderPrices()}
      {renderDescriptions()}


    </Paper>
  );
};
