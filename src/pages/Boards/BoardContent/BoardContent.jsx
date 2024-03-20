import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";

const BoardContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        width: "100%",
        height: (theme) => theme.trello.boardContentHeight,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2f3542" : "#5758BB",
      }}>
      <ListColumns />
    </Box>
  );
};

export default BoardContent;
