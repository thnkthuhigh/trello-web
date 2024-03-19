import {Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";
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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";

const BoardContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        width: "100%",
        height: (theme) => theme.trello.boardContentHeight,
        display: "flex",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2f3542" : "#5758BB",
      }}>
      {/* box-column */}
      <Box
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
            height: COLUMN_HEADER_HEIGHT,
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
            Column Title
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

        {/* box list card */}
        <Box
          sx={{
            p: "0 5px",
            m: "0 5px",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflowX: "hidden",
            overflowY: "auto",

            maxHeight: (theme) =>
              `calc(${theme.trello.boardContentHeight} - 
                ${theme.spacing(5)} -
                ${COLUMN_HEADER_HEIGHT} -
                ${COLUMN_FOOTER_HEIGHT}
                )`,
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ced0da",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#bfc2cf",
            },
          }}>
          List Card
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardMedia
              sx={{height: 140}}
              image='https://i.pinimg.com/736x/11/2c/e2/112ce265cfd07283bdc4f92f0800e60b.jpg'
              title='green iguana'
            />
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>Thanh thu high</Typography>
            </CardContent>
            <CardActions sx={{p: "0 4px 8px 4px"}}>
              <Button startIcon={<GroupIcon />} size='small'>
                20
              </Button>
              <Button startIcon={<CommentIcon />} size='small'>
                15
              </Button>
              <Button startIcon={<AttachmentIcon />} size='small'>
                20
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
        </Box>
        {/* box footer */}
        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT,
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
      {/* box column 2 */}
      <Box
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
            height: COLUMN_HEADER_HEIGHT,
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
            Column Title
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

        {/* box list card */}
        <Box
          sx={{
            p: "0 5px",
            m: "0 5px",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflowX: "hidden",
            overflowY: "auto",

            maxHeight: (theme) =>
              `calc(${theme.trello.boardContentHeight} - 
                ${theme.spacing(5)} -
                ${COLUMN_HEADER_HEIGHT} -
                ${COLUMN_FOOTER_HEIGHT}
                )`,
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ced0da",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#bfc2cf",
            },
          }}>
          List Card
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardMedia
              sx={{height: 140}}
              image='https://i.pinimg.com/736x/11/2c/e2/112ce265cfd07283bdc4f92f0800e60b.jpg'
              title='green iguana'
            />
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>Thanh thu high</Typography>
            </CardContent>
            <CardActions sx={{p: "0 4px 8px 4px"}}>
              <Button startIcon={<GroupIcon />} size='small'>
                20
              </Button>
              <Button startIcon={<CommentIcon />} size='small'>
                15
              </Button>
              <Button startIcon={<AttachmentIcon />} size='small'>
                20
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              overflow: "unset",
            }}>
            <CardContent sx={{p: 1.5, "&:last-child": {p: 1.5}}}>
              <Typography>2</Typography>
            </CardContent>
          </Card>
        </Box>
        {/* box footer */}
        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT,
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
    </Box>
  );
};

export default BoardContent;
