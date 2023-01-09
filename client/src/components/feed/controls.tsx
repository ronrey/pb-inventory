/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  Input,
} from "@mui/material";
import { styles } from "./styles";
import { useMutation, gql } from "@apollo/client";
interface Props {
  nodeId: number;
}
interface GetVibration {
  getFeedVibration: number;
}
interface GetRest {
  getFeedRest: number;
}
const REFREASH_RATE_VIBRATION = 1000;
const REFREASH_RATE_REST = 1000;
export const Controls: React.FC<Props> = ({ nodeId }) => {
  const FEED = gql`
  mutation feed($ozs: Float) {
    feed(ozs: $ozs, nodeId: ${nodeId})
  }
`;
  const FEED_ROTATE = gql`
    mutation feedRotate($rotations: Int, $direction: Int) {
      feedRotate(rotations: $rotations, direction: $direction, nodeId: ${nodeId})
    }
  `;
  const GET_VIBRATION = gql`
	query getFeedVibration {
	  getFeedVibration(nodeId: ${nodeId})
	}
  `;
  const GET_REST = gql`
	query getFeedRest {
	  getFeedRest(nodeId: ${nodeId})
	}
  `;
  const SET_VIBRATION = gql`
    mutation feedSetVibration($vibration: Int) {
		feedSetVibration(vibration: $vibration, nodeId: ${nodeId})
    }
  `;
  const SET_REST = gql`
    mutation feedSetRest($rest: Int) {
		feedSetRest(rest: $rest, nodeId: ${nodeId})
    }
  `;
  const START_FEED = gql`
    mutation startFeed {
      startFeed(nodeId: ${nodeId})
    }
  `;
  const STOP_FEED = gql`
    mutation stop {
      feedStop(nodeId: ${nodeId})
    }
  `;
  const [showProgress, setShowProgress] = useState(false);
  const [rest, setRest] = useState(0);
  const [vibration, setVibe] = useState(1);
  const [ozs, setOzs] = useState(1);
  const [rotations, setRotations] = useState(1);
  const [direction, setDirection] = useState(true);
  const [startFeed] = useMutation(START_FEED, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  const [stopFeed] = useMutation(STOP_FEED, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  const [feedRotate] = useMutation(FEED_ROTATE, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      setShowProgress(false);
      debugger;
    },
  });
  const [feed, { loading }] = useMutation(FEED, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      setShowProgress(false);
      debugger;
    },
  });
  const [setVibration] = useMutation(SET_VIBRATION, {
    onCompleted(data) {
      console.log(data);
    },
    onError: (err) => {
      debugger;
    },
  });
  const [setPause] = useMutation(SET_REST, {
    onCompleted(data) {
      console.log(data);
    },
    onError: (err) => {
      debugger;
    },
  });
  const [getVibration] = useLazyQuery<GetVibration>(GET_VIBRATION, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      debugger;
      setVibe(parseInt(data.getFeedVibration.toFixed(3)));
      //  setTimeout(() => getVibration(), REFREASH_RATE_VIBRATION);
    },
  });
  const [getRest] = useLazyQuery<GetRest>(GET_REST, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setRest(parseInt(data.getFeedRest.toFixed(3)));
    },
  });
  useEffect(() => {
    getRest();
    getVibration();
  }, []);
  const onHandleRotate = () => {
    feedRotate({
      variables: {
        rotations: rotations,
        direction: direction ? 1 : 0,
      },
    });
  };
  const onHandleStart = () => {
    startFeed({
      variables: {
        direction: 1,
      },
    });
  };
  const onFeed = () => {
    feed({
      variables: {
        ozs: ozs,
      },
    });
  };
  const onSetVibration = () => {
    setVibration({
      variables: {
        vibration: vibration,
      },
    });
  };
  const onSetRest = () => {
    setPause({
      variables: {
        rest: rest,
      },
    });
  };
  useEffect(() => {
    if (loading) setShowProgress(true);
  }, [loading]);
  const handleOzChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOzs(parseFloat(event.target.value));
  };
  const handleVibrationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVibe(parseInt(event.target.value));
  };
  const handleRestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRest(parseInt(event.target.value));
  };
  const handleRotationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRotations(parseInt(event.target.value));
  };
  const handleDirectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDirection(event.target.checked);
  };
  return (
    <div css={styles.container}>
      {showProgress && <CircularProgress css={styles.progress} />}
      <div css={styles.controls}>
        <div css={styles.InputAndButton}>
          <Input
            type="number"
            css={styles.input}
            value={ozs}
            onChange={handleOzChange}
            inputProps={{ min: ".1", max: "3.5", step: ".1" }}
          />
          <div css={styles.controlText}>ozs</div>
          <Button
            css={styles.feedButton}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              onFeed();
            }}
          >
            feed
          </Button>
        </div>
        <div css={styles.InputAndButton}>
          <Input
            type="number"
            css={styles.input}
            value={rotations}
            onChange={handleRotationsChange}
            inputProps={{ min: "1", max: "10", step: ".1" }}
          />

          <div css={styles.controlText}>rotations</div>

          <FormControlLabel
            control={
              <Switch
                checked={direction}
                onChange={handleDirectionChange}
                inputProps={{ "aria-label": "rotate" }}
              />
            }
            label="CW"
          />
          <Button
            css={styles.feedButton}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              onHandleRotate();
            }}
          >
            rotate
          </Button>
        </div>
        <div css={styles.onOffContainer}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            css={styles.button}
            onClick={() => {
              onHandleStart();
            }}
          >
            go
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            css={styles.button}
            style={{ marginRight: 0 }}
            onClick={() => {
              stopFeed();
            }}
          >
            stop
          </Button>
        </div>

        <Paper elevation={4} css={styles.settingsContainer}>
          <div css={styles.InputAndButton}>
            <Input
              type="number"
              css={styles.input}
              value={vibration}
              onChange={handleVibrationChange}
              inputProps={{ min: "1" }}
            />
            <div css={styles.controlText}>milliseconds</div>
            <Button
              css={styles.feedButton}
              variant="contained"
              size="small"
              color="primary"
              onClick={() => {
                onSetVibration();
              }}
            >
              Vibes
            </Button>
          </div>
          <div css={styles.InputAndButton}>
            <Input
              type="number"
              css={styles.input}
              value={rest}
              onChange={handleRestChange}
              inputProps={{ min: "1" }}
            />
            <div css={styles.controlText}>milliseconds</div>
            <Button
              css={styles.feedButton}
              variant="contained"
              size="small"
              color="primary"
              onClick={() => {
                onSetRest();
              }}
            >
              Rest
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};
