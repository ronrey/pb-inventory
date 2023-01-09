/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { styles } from "./styles";
import { useLazyQuery, gql } from "@apollo/client";
import { Controls as FeedControls } from '../feed/controls'
import { Controls as VibratorControls } from '../vibrator/controls'
import { Controls as NodeControls } from '../node/controls'
interface Props {
  nodeId: number;
}
interface StepperPosition {
  stepperPosition: number;
}
interface GetOzs {
  getOzs: number;
}
interface GetAdjusted {
  getAdjusted: number;
}
interface GetVibration {
  getFeedVibration: number;
}
interface GetRest {
  getFeedRest: number;
}
const REFREASH_RATE_OZS = 100;
const REFREASH_RATE_VIBRATION = 1000;
const REFREASH_RATE_REST = 1000;
const REFREASH_RATE_RAW = 100;
const REFREASH_RATE_POSITION = 500;
interface Props { }
export const ControlPanel: React.FC<Props> = ({ nodeId }) => {
  const GET_OZS = gql`
    query getOzs {
      getOzs(nodeId: ${nodeId})
    }
  `;
  const GET_ADJUSTED = gql`
  query getAdjusted {
    getAdjusted(nodeId: ${nodeId})
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
  const STEPPER_POSITION = gql`
  query stepperPosition {
    stepperPosition(nodeId: ${nodeId})
  }
`;
  const [position, setPosition] = useState(0);
  const [ozs, setOzs] = useState(0);
  const [adjusted, setAdjusted] = useState(0);
  const [feedRest, setFeedRest] = useState(0);
  const [feedVibration, setFeedVibration] = useState(0);
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
  const [getAdjusted] = useLazyQuery<GetAdjusted>(GET_ADJUSTED, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setAdjusted(parseFloat(data.getAdjusted.toFixed(3)));
      setTimeout(() => getAdjusted(), REFREASH_RATE_RAW);
    },
  });
  const [getVibration] = useLazyQuery<GetVibration>(GET_VIBRATION, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      debugger;
      setFeedVibration(parseFloat(data.getFeedVibration.toFixed(3)));
      setTimeout(() => getVibration(), REFREASH_RATE_VIBRATION);
    },
  });
  const [getRest] = useLazyQuery<GetRest>(GET_REST, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setFeedRest(parseFloat(data.getFeedRest.toFixed(3)));
      setTimeout(() => getRest(), REFREASH_RATE_REST);
    },
  });
  useEffect(() => {
    getOzs();
    getAdjusted();
    //   getRest();
    // getVibration();
    getStepperPosition();
  }, [getOzs, getStepperPosition, getAdjusted /* getVibration, getRest */]);
  const renderControls = () => {
    return (
      <Paper elevation={16} css={styles.controlsContainer}>
        <Paper css={styles.control}>
          <Typography> feed</Typography>
          <FeedControls nodeId={nodeId} />
        </Paper>
        <Paper css={styles.control}>
          <Typography> vib</Typography>
          <VibratorControls nodeId={nodeId} />
        </Paper>
        <Paper css={styles.control}>
          <Typography> gate</Typography>
          <NodeControls nodeId={nodeId} />
        </Paper>
      </Paper>

    )
  }
  const renderDisplay = () => {
    return (
      <div css={styles.outputs}>
        <div css={styles.labelAndOutput}>
          <Typography css={styles.label} color="primary" variant="h6">
            Oz:
          </Typography>
          <Typography css={styles.output} color="secondary" variant="h6">
            {`${ozs.toFixed(3)}`}
          </Typography>
        </div>
        <div css={styles.labelAndOutput}>
          <Typography css={styles.label} color="primary" variant="h6">
            Tared:
          </Typography>
          <Typography css={styles.output} color="secondary" variant="h6">
            {`${adjusted}`}
          </Typography>
        </div>
        <div css={styles.labelAndOutput}>
          <Typography css={styles.label} color="primary" variant="h6">
            Gate:
          </Typography>
          <Typography css={styles.output} color="secondary" variant="h6">
            {position === 0
              ? "closed"
              : `${((position / 1880) * 100).toFixed(0)}%`}
          </Typography>
        </div>

      </div>

    )
  }
  return (
    <Paper elevation={16} css={styles.container}>
      <Typography css={styles.title} variant="h6">{nodeId + 1}</Typography>

      {renderDisplay()}
      {renderControls()}
    </Paper>
  );
};
