/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { styles } from "./styles";
import { gql, useLazyQuery } from "@apollo/client";
interface GetOzs {
  getOzs: number;
}
interface Props {
  nodeId: number;
}
const REFREASH_RATE_OZS = 100;
export const Display: React.FC<Props> = ({ nodeId }) => {
  const GET_OZS = gql`
    query getOzs {
      getOzs(nodeId: ${nodeId})
    }
  `;
  const [ozs, setOzs] = useState(1);
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
  }, [getOzs]);
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
    </Paper>
  );
};
