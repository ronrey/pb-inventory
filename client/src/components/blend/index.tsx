/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { styles } from "./styles";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { BlendInput } from "../blendInput";
import ListIcon from '@mui/icons-material/List';
interface Props {

}
interface TotalBlends {
  totalBlends: string;
}
// interface AddBlend {
//   addBlend(item: BlendInterface): Status
// }
const REFREASH_RATE_OZS = 1000;

const protoBlend = {
  "_id": "",
  "name": "name",
  "decaf": false,
  "prices": [
    {
      "measurement": "lbs",
      "quantity": 1,
      "price": 21
    },
    {
      "measurement": "lbs",
      "quantity": 2,
      "price": 40
    }
  ],
  "coffees": [

  ],
  "mouthfeel": 0.0,
  "acidity": 0.0,
  "caramel": 0.0,
  "fruit": 0.0,
  "flower": 0.0,
  "flavors": [
    "yummy",
    "good"
  ],
  "qualities": [
    "smooth",
    "mellow"
  ],
  "paragraphs": [
    "this is a note"
  ],
  "state": "inhouse"
};
interface Price {
  measurement: string
  quantity: number
  price: number
}
interface BlendInterface {
  _id: string
  name: string
  state: string
  decaf: boolean
  prices: Price[]
  coffees: string[]
  mouthfeel: number
  acidity: number
  caramel: number
  fruit: number
  flower: number
  flavors: string[]
  qualities: string[]
  paragraphs: string[]
}
interface Props { }
export const Blend: React.FC<Props> = () => {
  const ADD_COFFEE = gql`
  mutation AddBlend($item:BlendInput) {
  addBlend(item:$item) {
    code
    message
    success
  }
}
  `;
  const TOTAL_COFFEES = gql`
    query totalBlends {
      totalBlends
    }
  `;
  const navagate = useNavigate();
  const [blendCount, setBlendCount] = useState('');
  const [blend, setBlend] = useState<BlendInterface>(protoBlend);
  const [addBlend] = useMutation(ADD_COFFEE, {
    onCompleted(data) {
      // setShowProgress(false);
    },
    onError: (err) => {
      //  setShowProgress(false);
      debugger;
    },
  });
  const [totalBlends] = useLazyQuery<TotalBlends>(TOTAL_COFFEES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setBlendCount(data.totalBlends);
      setTimeout(() => totalBlends(), REFREASH_RATE_OZS);
    },
    onError: (err) => {
      debugger;
    },
  });

  useEffect(() => {
    totalBlends();
  }, [totalBlends,]);

  const createPrices = (blend: BlendInterface) => {
    return blend.prices.map((price) => ({ price: price.price, measurement: price.measurement, quantity: price.quantity }))
  }
  const createBlendData = () => {
    return blend ? {
      state: blend.state,
      name: blend.name,
      decaf: blend.decaf,
      prices: createPrices(blend),
      coffees: blend.coffees,
      mouthfeel: blend.mouthfeel,
      acidity: blend.acidity,
      caramel: blend.caramel,
      fruit: blend.fruit,
      flower: blend.flower,
      flavors: blend.flavors,
      qualities: blend.qualities,
      paragraphs: blend.paragraphs
    } : null;
  };


  const onAddBlend = () => {
    const c = createBlendData();
    console.log(c)
    addBlend({
      variables: {
        item: c,
      },
    });
  };
  const handleNavagateClick = () => {
    navagate('/blends')
  };
  const handleBlendChange = (blend: BlendInterface) => {
    setBlend(blend);
  };

  const renderDisplay = () => {
    return (
      <div css={styles.outputs}>
        <div css={styles.labelAndOutput}>
          <Typography css={styles.label} color="primary" variant="h6">
            Blend count:
          </Typography>
          <Typography css={styles.output} color="secondary" variant="h6">
            {`${blendCount}`}
          </Typography>
        </div>


      </div>

    )
  }
  return (
    <Paper elevation={16} css={styles.container}>
      <div css={styles.headerContainer}>
        <Typography css={styles.title} variant="h6">Blend</Typography>
        <Button color="primary" onClick={handleNavagateClick} >
          <ListIcon />blends
        </Button>
      </div>
      {renderDisplay()}
      <Button
        css={styles.fullWidthButton}
        variant="contained"
        size="small"
        color="primary"
        onClick={() => {
          onAddBlend();
        }}
      >
        add
      </Button>
      <BlendInput blend={blend} onChange={handleBlendChange} />


    </Paper>
  );
};
