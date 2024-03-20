import {Container} from "@mui/system";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

const Board = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{height: "100vh", backgroundColor: "primary.main"}}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  );
};

export default Board;
