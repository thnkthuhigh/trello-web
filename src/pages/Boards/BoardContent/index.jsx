import Box from "@mui/material/Box";

const BoardContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        width: "100%",
        height: (theme) =>
          `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boarBatHeight})`,
        display: "flex",
        alignItems: "center",
      }}>
      Box Content
    </Box>
  );
};

export default BoardContent;
