import {useState} from "react";
import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentCut from "@mui/icons-material/ContentCut";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCard from "./ListCards/ListCards";
import {mapOrder} from "~/utils/sorts";

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

const Column = ({column}) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id: column._id, data: {...column}});

  const dndKitColumnStyles = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform), //translate not tranforming
    transition,
    // chieu cao div 100% giai quyet bug column ngan dai
    height: "100%",
    //khi keo lam mo
    opacity: isDragging ? 0.5 : undefined,
  };
  const ordereCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners} //vung keo nang tron box
        sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#525b70" : "#9c91ba",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}>
        {/* box-column-herder */}

        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem",
            }}>
            {column?.title}
          </Typography>
          {/* dropdown */}
          <Box>
            {" "}
            <div>
              <Tooltip title='More options'>
                <ExpandMoreIcon
                  sx={{color: "text.primary", cursor: "pointer"}}
                  id='basic-column-dropdown'
                  aria-controls={
                    open ? "basic-menu-column-dropdown" : undefined
                  }
                  aria-haspopup='true'
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id='basic-menu-column-dropdown'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-column-dropdown'",
                }}>
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>

                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          </Box>
        </Box>

        {/* listcard */}

        <ListCard cards={ordereCards} />
        {/* box footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Button startIcon={<AddCardIcon />}>Add new card</Button>
          <Tooltip title='Drag to move'>
            <DragHandleIcon />
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
};

export default Column;
