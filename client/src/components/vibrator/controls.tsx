/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Button, CircularProgress, TextField, Input } from "@mui/material";
import { styles } from "./styles";
import { useMutation, gql } from "@apollo/client";
interface Props {
  nodeId: number;
}

export const Controls: React.FC<Props> = ({ nodeId }) => {
  const VIBRATOR_CYCLE = gql`
  mutation vibratorCycle($onFor: Int, $offFor: Int) {
    vibratorCycle(onFor: $onFor, offFor: $offFor, nodeId: ${nodeId})
  }
`;
  const VIBRATOR_ON = gql`
  mutation vibratorOn {
    vibratorOn(nodeId: ${nodeId})
  }
`;
  const VIBRATOR_OFF = gql`
  mutation vibratorOff {
    vibratorOff(nodeId: ${nodeId})
  }
`;
  const [showProgress, setShowProgress] = useState(false);
  const [onFor, setOnFor] = useState(1000);
  const [offFor, setOffFor] = useState(1000);
  const [vibratorOn] = useMutation(VIBRATOR_ON, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  const [vibratorOff] = useMutation(VIBRATOR_OFF, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  const [vibratorCycle] = useMutation(VIBRATOR_CYCLE, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      setShowProgress(false);
      debugger;
    },
  });
  const onHandleCycle = () => {
    vibratorCycle({
      variables: {
        onFor: onFor,
        offFor: offFor,
      },
    });
  };
  const handleOnForChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnFor(parseInt(event.target.value));
  };
  const handleOffForChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOffFor(parseInt(event.target.value));
  };
  return (
    <div css={styles.container}>
      {showProgress && <CircularProgress css={styles.progress} />}

      <div css={styles.container}>
        <div css={styles.labelAndOutput}>
          <div css={styles.controlText}>on for</div>

          <Input
            type="number"
            css={styles.input}
            value={onFor}
            onChange={handleOnForChange}
            inputProps={{ min: "0" }}
          />
          <div css={styles.controlText}>, off for</div>

          <Input
            type="number"
            css={styles.input}
            value={offFor}
            onChange={handleOffForChange}
            inputProps={{ min: "0" }}
          />
          <Button
            css={styles.feedButton}
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              onHandleCycle();
            }}
          >
            cycle
          </Button>
        </div>
        <div css={styles.onOffContainer}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            css={styles.button}
            onClick={() => {
              vibratorOn();
            }}
          >
            on
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            css={styles.button}
            style={{ marginRight: 0 }}
            onClick={() => {
              vibratorOff();
            }}
          >
            off
          </Button>
        </div>
      </div>
    </div>
  );
};
