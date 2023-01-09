/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { styles } from "./styles";
import { Display } from "./display";
import { Controls } from "./controls";
interface Props {
  nodeId: number;
}
export const Feed: React.FC<Props> = ({ nodeId }) => {
  return (
    <div css={styles.container}>
      <Typography color="primary" variant="h4" css={styles.text}>
        Feed
      </Typography>
      <Display nodeId={nodeId} />
      <Controls nodeId={nodeId} />
    </div>
  );
};
