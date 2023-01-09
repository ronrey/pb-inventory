/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { styles } from "./styles";
import { useMutation, gql } from "@apollo/client";

interface Props {
  nodeId: number;
}
export const Controls: React.FC<Props> = ({ nodeId }) => {
  const RUN_CYCLE = gql`
    mutation stepperCycle {
      stepperCycle(nodeId: ${nodeId})
    }
  `;
  const ZERO_GATE = gql`
    mutation zeroGate {
      zeroGate(nodeId: ${nodeId})
    }
  `;
  const STEPPER_STOP = gql`
    mutation stop {
		stepperStop(nodeId: ${nodeId})
    }
  `;
  const [showProgress, setShowProgress] = useState(false);
  const [runCycle, { loading: cycleLoading }] = useMutation(RUN_CYCLE, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
    },
  });
  const [zeroGate, { loading: zeroGateLoading }] = useMutation(ZERO_GATE, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  const [stepperStop] = useMutation(STEPPER_STOP, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  useEffect(() => {
    if (zeroGateLoading || cycleLoading) setShowProgress(true);
  }, [zeroGateLoading, cycleLoading]);
  return (
    <div css={styles.container}>
      {showProgress && <CircularProgress css={styles.progress} />}
      <div css={styles.buttons}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          css={styles.button}
          onClick={() => {
            runCycle();
          }}
        >
          cycle
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          css={styles.button}
          onClick={() => {
            zeroGate();
          }}
        >
          zero gate
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          css={styles.button}
          onClick={() => {
            stepperStop();
          }}
        >
          stop
        </Button>
      </div>
    </div>
  );
};
