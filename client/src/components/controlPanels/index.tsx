/** @jsxImportSource @emotion/react */
import { Typography, Paper, Button } from "@mui/material";
import { styles } from "./styles";
import { ControlPanel } from "../controlPanel";
import { useMutation, gql } from "@apollo/client";

interface Props {}
const panels = [
  {
    name: "one",
  },
  {
    name: "two",
  },
  {
    name: "three",
  },
];
export const ControlPanels: React.FC<Props> = () => {
  const STOP = gql`
    mutation stop {
      stop
    }
  `;
  const [stop] = useMutation(STOP, {
    onCompleted(data) {
      console.log(`stopped, data:${data}`);
    },
    onError: (err) => {
      debugger;
    },
  });
  return (
    <div css={styles.container}>
      <Button
        css={styles.stopButton}
        variant="contained"
        size="large"
        color="error"
        onClick={() => {
          stop();
        }}
      >
        Emergency Stop
      </Button>
      <div css={styles.controlPanels}>
        {panels.map((p, i) => (
          <ControlPanel nodeId={i} key={i} />
        ))}
      </div>
    </div>
  );
};
