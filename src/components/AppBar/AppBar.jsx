import {useState} from "react";

import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelects/ModeSelects";
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
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const AppBar = () => {
  const [searchValue, setsearchValue] = useState("");

  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflow: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#121212" : "#8362e0",
      }}>
      <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
        <AppsIcon fontSize='small' sx={{color: "#fff"}} />
        <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
          <SvgIcon
            component={StarIcon}
            inheritViewBox
            fontSize='small'
            sx={{color: "#fff"}}
          />
          <Typography
            variant='span'
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#fff",
              size: "small",
            }}>
            Trello
          </Typography>
        </Box>
        <Workspace />
        <Recent />
        <Templates />
        <Button
          variant='outlined'
          startIcon={<ControlPointIcon />}
          sx={{
            color: "#fff",
            border: "none",
            "&:hover": {border: "none"},
          }}>
          Create
        </Button>
      </Box>
      <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
        <TextField
          id='outlined-search'
          label='Search...'
          type='text'
          size='small'
          value={searchValue}
          onChange={(e) => {
            setsearchValue(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{color: "#fff"}} />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize='small'
                sx={{
                  color: searchValue ? "#fff" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => setsearchValue("")}
              />
            ),
          }}
          sx={{
            minWidth: 120,
            maxWidth: 180,
            "& label": {color: "#fff"},
            "& input": {color: "#fff"},
            "& label.Mui-focused": {color: "#fff"},
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fff",
              },
              "&:hover fieldset": {
                borderColor: "#fff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
          }}
        />
        <ModeSelect />
        <Tooltip title='Notification'>
          <Badge color='warning' variant='dot' sx={{cursor: "pointer"}}>
            <NotificationsNoneIcon sx={{color: "#fff"}} />
          </Badge>
        </Tooltip>

        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{cursor: "pointer", color: "#fff"}} />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  );
};

export default AppBar;
