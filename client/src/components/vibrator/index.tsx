/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { styles } from "./styles";
import { Controls } from "./controls";
interface Props {
  nodeId: number;
}
export const Vibrator: React.FC<Props> = ({ nodeId }) => {
  return (
    <div css={styles.container}>
      <Typography color="primary" css={styles.text}>
        Vibrator
      </Typography>
      <Controls nodeId={nodeId} />
    </div>
  );
};
