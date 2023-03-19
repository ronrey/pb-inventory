/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
//import { styles } from "./styles";
interface Props {
  goTo: string;
}
export const BackButton: React.FC<Props> = ({ goTo }) => {
  const navagate = useNavigate();
  const showBack = true;
  //const showBack = history.location.pathname !== "/",
  function onClick() {
    goTo ? navagate(goTo) : navagate(-1);
  }

  return (
    <>
      {showBack ? (
        <IconButton style={{ padding: 0 }} aria-label="Back" onClick={onClick}>
          <BackIcon color="primary" fontSize="large" />
        </IconButton>
      ) : null}
    </>
  );
};
export default BackButton;
