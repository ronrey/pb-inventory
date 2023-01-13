/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from "@mui/material";
import { styles } from "./styles";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Blend } from '../blend';
import { BlendInput } from "../blendInput";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { EnhancedTable } from './enhancedTable'
interface Blend {
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
interface TotalBlends {
  totalBlends: string;
}
interface GetBlends {
  getBlends: Blend[];
}

const REFREASH_RATE_COFFEE_COUNT = 1000;
const REFREASH_RATE_COFFEES = 1000;


interface Price {
  measurement: string
  quantity: number
  price: number
}


interface Props { }
export const Blends: React.FC<Props> = () => {
  const UPDATE_COFFEE = gql`
    mutation UpdateBlend($item:BlendInput) {
      updateBlend(item:$item) {
        code
        message
        success
      }
    }
  `;
  const REMOVE_COFFEE = gql`
    mutation RemoveBlend($id: ID) {
      removeBlend(id: $id) {
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
  const GET_COFFEES = gql`
    query GetBlends {
      getBlends {
        acidity
        _id
        name
        caramel
        coffees
        decaf
        flavors
        flower
        fruit
        mouthfeel
        paragraphs
        prices {
          measurement
          price
          quantity
        }
        qualities
        state
      }
    }
  `;
  const navagate = useNavigate();
  const [blendCount, setBlendCount] = useState('');
  const [blends, setBlends] = useState<Blend[]>([]);
  const [blend, setBlend] = useState<Blend | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [deletee, setDeletee] = useState<Blend | null>(null);
  const [updateBlend] = useMutation(UPDATE_COFFEE, {
    onCompleted(data) {
      console.log(`update completed sucessfully`)
      setBlend(null);
      // setShowProgress(false);
    },
    onError: (err) => {
      //  setShowProgress(false);
      debugger;
    },
  });


  const [removeBlend] = useMutation(REMOVE_COFFEE, {
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
  const [totalBlends] = useLazyQuery<TotalBlends>(TOTAL_COFFEES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setBlendCount(data.totalBlends);
      setTimeout(() => totalBlends(), REFREASH_RATE_COFFEE_COUNT);
    },
    onError: (err) => {
      debugger;
    },
  });
  const [getBlends] = useLazyQuery<GetBlends>(GET_COFFEES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setBlends(data.getBlends);
      setTimeout(() => getBlends(), REFREASH_RATE_COFFEES);
    },
    onError: (err) => {
      debugger;
    },
  });
  useEffect(() => {
    totalBlends();
    getBlends();
  }, [totalBlends, getBlends]);
  const onUpdateBlend = () => {
    updateBlend({
      variables: {
        item: createBlendData(),
      },
    });
  };
  const handleRemoveBlend = () => {
    if (deletee)
      removeBlend({
        variables: {
          id: deletee._id,
        },
      });
  };
  const createPrices = (blend: Blend) => {
    return blend.prices.map((price) => ({ price: price.price, measurement: price.measurement, quantity: price.quantity }))
  }
  const createBlendData = () => {
    return blend ? {
      _id: blend._id,
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
  const getBlend = (_id: string) => {
    const c = blends.find((blend) => blend._id === _id);
    return c ? c : null;
  };
  const handleBlendChange = (blend: Blend) => {
    setBlend(blend);
  };
  const handleNavagateClick = () => {
    navagate('/blend')
  };
  const handleBlendClick = (_id: string) => {
    console.log('blend clicked')
    const c = getBlend(_id);
    if (c)
      setBlend(c);
  };
  const handleDeleteClick = (_id: string) => {
    setDeletee(getBlend(_id));
    setOpen(true)
    console.log(`hande delete ${_id}`)
  }
  const handleOKedDelete = () => {
    handleRemoveBlend();
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
        <DialogTitle>Delete Blend</DialogTitle>
        <DialogContent dividers>
          {`Do you really want to delete blend with key = ${deletee.name}`}
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
      <EnhancedTable data={blends} onDeleteClick={handleDeleteClick} onRowClick={handleBlendClick} />
    )

  }
  const renderBlend = () => {
    if (blend !== null)
      return (
        <div>
          {renderButtons()}
          <BlendInput blend={blend} onChange={handleBlendChange} />
        </div>
      )
    return null;
  }
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
  const renderButtons = () => {
    return (<div css={styles.buttonContainer}>
      <Button
        css={styles.button}
        variant="contained"
        size="small"
        color="primary"
        onClick={() => {
          onUpdateBlend();
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
          setBlend(null)
        }}
      >
        close
      </Button>
    </div>)
  }
  const renderBlends = () => {
    return (
      <div>
        <div css={styles.headerContainer}>
          <Typography css={styles.title} variant="h6">Blends</Typography>
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
    <Paper elevation={16} css={styles.container}>
      {renderDeleteAlert()}
      {blend ? renderBlend() : renderBlends()}

      {/* renderGeneral()}

      {renderFlavorProfile()}
      {renderPrices()}
      {renderDescriptions() */}


    </Paper>
  );
};
