/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { styles } from "./styles";
import { useMutation, gql } from "@apollo/client";

interface Props {
  nodeId: number;
}
export const Controls: React.FC<Props> = ({ nodeId }) => {
  const RESET_BASELINE = gql`
    mutation scaleResetBaseline {
      scaleResetBaseline(nodeId: ${nodeId})
    }
  `;
  const [showProgress, setShowProgress] = useState(false);
  const [resetBaseline, { loading }] = useMutation(RESET_BASELINE, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  useEffect(() => {
    if (loading) setShowProgress(true);
  }, [loading]);
  return (
    <div css={styles.container}>
      {showProgress && <CircularProgress css={styles.progress} />}
      <div css={styles.buttons}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          css={styles.button}
          onClick={() => {
            resetBaseline();
          }}
        >
          reset tare
        </Button>
      </div>
    </div>
  );
};
