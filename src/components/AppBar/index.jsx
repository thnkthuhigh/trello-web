import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelects";
import AppsIcon from "@mui/icons-material/Apps";
import SvgIcon from "@mui/material/SvgIcon";
import {ReactComponent as StarIcon} from "~/assets/trello.svg";
import {Typography} from "@mui/material";
import Workspace from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Templates from "./Menus/Templates";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";

const AppBar = () => {
  return (
    <Box
      px={2}
      sx={{
        backgroundColor: "#fff",
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
        <AppsIcon fontSize='small' sx={{color: "primary.main"}} />
        <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
          <SvgIcon
            component={StarIcon}
            inheritViewBox
            fontSize='small'
            sx={{color: "primary.main"}}
          />
          <Typography
            variant='span'
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "primary.main",
              size: "small",
            }}>
            Trello
          </Typography>
        </Box>
        <Workspace />
        <Recent />
        <Templates />
        <Button variant='outlined'>Create</Button>
      </Box>
      <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
        <TextField
          id='outlined-search'
          label='Search...'
          type='search'
          size='small'
        />
        <ModeSelect />
        <Tooltip title='Notification'>
          <Badge color='secondary' variant='dot' sx={{cursor: "pointer"}}>
            <NotificationsNoneIcon sx={{color: "primary.main"}} />
          </Badge>
        </Tooltip>

        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{cursor: "pointer", color: "primary.main"}} />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  );
};

export default AppBar;
