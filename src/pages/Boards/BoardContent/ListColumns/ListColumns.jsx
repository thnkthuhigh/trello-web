import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const ListColumns = () => {
  return (
    <Box
      sx={{
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        "&::-webkit-scrollbar-track": {m: 2},
      }}>
      <Column />
      <Column />
      <Column />

      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "200px",
          mx: 2,
          borderRadius: "6px",
          height: "fit-content",
          bgcolor: "#9c91ba",
        }}>
        <Button
          sx={{
            color: "#fff",
            width: "100%",
            justifyContent: "center",
            pl: 2.5,
            py: 1,
          }}
          startIcon={<AddIcon />}>
          Add new column
        </Button>
      </Box>
    </Box>
  );
};

export default ListColumns;
