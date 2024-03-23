import {Container} from "@mui/system";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import {mockData} from "~/apis/mock-data";

const Board = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{height: "100vh", backgroundColor: "primary.main"}}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  );
};

export default Board;
