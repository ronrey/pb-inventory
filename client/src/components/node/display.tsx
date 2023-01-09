/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { styles } from "./styles";
import { useLazyQuery, gql } from "@apollo/client";
interface Props {
  nodeId: number;
}
interface StepperPosition {
  stepperPosition: number;
}

interface GetOzs {
  getOzs: number;
}
const REFREASH_RATE_OZS = 100;
const REFREASH_RATE_POSITION = 1000;
interface Props {
  nodeId: number;
}
export const Display: React.FC<Props> = ({ nodeId }) => {
  const STEPPER_POSITION = gql`
  query stepperPosition {
    stepperPosition(nodeId: ${nodeId})
  }
`;
  const GET_OZS = gql`
  query getOzs {
    getOzs(nodeId: ${nodeId})
  }
`;
  const [position, setPosition] = useState(0);
  const [ozs, setOzs] = useState(0);
  const [getStepperPosition] = useLazyQuery<StepperPosition>(STEPPER_POSITION, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setPosition(data.stepperPosition);
      setTimeout(() => getStepperPosition(), REFREASH_RATE_POSITION);
    },
  });
  const [getOzs] = useLazyQuery<GetOzs>(GET_OZS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setOzs(data.getOzs);
      setTimeout(() => getOzs(), REFREASH_RATE_OZS);
    },
    onError: (err) => {
      debugger;
    },
  });
  useEffect(() => {
    getOzs();
    getStepperPosition();
  }, [getOzs, getStepperPosition]);
  const renderOutputs = () => {
    return (
      <Paper elevation={3} css={styles.outputs}>
        <div css={styles.labelAndOutput}>
          <Typography css={styles.label} variant="h6">
            Scale:
          </Typography>
          <Typography css={styles.output} variant="h6">
            {`${ozs.toFixed(3)} ozs`}
          </Typography>
        </div>
        <div css={styles.labelAndOutput}>
          <Typography css={styles.label} variant="h6">
            Position:
          </Typography>
          <Typography css={styles.output} variant="h6">
            {position === 0 ? "closed" : position}
          </Typography>
        </div>
      </Paper>
    );
  };
  return <div css={styles.container}>{renderOutputs()}</div>;
};
