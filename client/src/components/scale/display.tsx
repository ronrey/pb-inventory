/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { styles } from "./styles";
import { useLazyQuery, gql } from "@apollo/client";
interface Props {
  nodeId: number;
}
interface GetOzs {
  getOzs: number;
}
interface GetRaw {
  getRaw: number;
}
const REFREASH_RATE_OZS = 100;
const REFREASH_RATE_RAW = 100;

export const Display: React.FC<Props> = ({ nodeId }) => {
  const GET_OZS = gql`
  query getOzs {
    getOzs(nodeId: ${nodeId})
  }
`;
  const GET_RAW = gql`
  query getRaw {
    getRaw(nodeId: ${nodeId})
  }
`;
  const [ozs, setOzs] = useState(0);
  const [raw, setRaw] = useState(0);
  const [getOzs] = useLazyQuery<GetOzs>(GET_OZS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log(`getOzs complete ozs : ${data.getOzs}`);
      setOzs(data.getOzs);
      setTimeout(() => getOzs(), REFREASH_RATE_OZS);
    },
  });
  const [getRaw] = useLazyQuery<GetRaw>(GET_RAW, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log(`getRaw complete raw : ${data.getRaw}`);
      setRaw(parseFloat(data.getRaw.toFixed(3)));
      setTimeout(() => getRaw(), REFREASH_RATE_RAW);
    },
  });
  useEffect(() => {
    getRaw();
    getOzs();
  }, [getRaw, getOzs]);
  const renderOutputs = () => {
    return (
      <Paper elevation={3} css={styles.outputs}>
        <div css={styles.labelAndOutput}>
          {" "}
          <Typography css={styles.label} variant="h6">
            Scale:{" "}
          </Typography>{" "}
          <Typography css={styles.output} variant="h6">
            {`${ozs.toFixed(3)} ozs`}{" "}
          </Typography>
        </div>
        <div css={styles.labelAndOutput}>
          {" "}
          <Typography css={styles.label} variant="h6">
            Raw:{" "}
          </Typography>{" "}
          <Typography css={styles.output} variant="h6">
            {`${raw}`}{" "}
          </Typography>
        </div>
      </Paper>
    );
  };
  return <div css={styles.container}>{renderOutputs()}</div>;
};
