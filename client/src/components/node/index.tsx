/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { styles } from "./styles";
import { Display } from "./display";
import { Controls } from "./controls";
interface Props {
  nodeId: number;
}
export const Node: React.FC<Props> = ({ nodeId }) => {
  return (
    <div css={styles.container}>
      <Typography color="primary" css={styles.text}>
        Node
      </Typography>
      <Display nodeId={nodeId} />
      <Controls nodeId={nodeId} />
    </div>
  );
};
