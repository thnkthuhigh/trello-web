import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import {Button, Tooltip} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
const MENU_STYLES = {
  color: "#fff",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "5px",
  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
  "&:hover": {
    color: "primary.50",
  },
};

const BoardBar = () => {
  return (
    <Box
      px={2}
      sx={{
        backgroundColor: "#fff",
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflow: "auto",
        borderBottom: "1px solid #00bfa5",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2f3542" : "#5758BB",
      }}>
      <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label='Thanh MERN Stack Board'
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label='Public/Privete Workspace'
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label='Add to Google Drive'
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FlashOnIcon />}
          label='Automation'
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label='Filters'
          onClick={() => {}}
        />
      </Box>

      <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
        <Button
          variant='outlined'
          startIcon={<PersonAddAlt1Icon />}
          sx={{
            color: "#fff",
            borderColor: "#fff",
            "&:hover": {borderColor: "#fff"},
          }}>
          Invite
        </Button>
        <AvatarGroup
          max={5}
          total={24}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "#fff",
              cursor: "pointer",
              "&:first-of-type": {bgcolor: "#a4b0be"},
            },
          }}>
          <Tooltip title='Thanh'>
            <Avatar
              alt='Thanh'
              src='https://avatars.githubusercontent.com/u/132247739?v=4'
            />
          </Tooltip>
          <Tooltip title='Thanh'>
            <Avatar
              alt='Thanh'
              src='https://avatars.githubusercontent.com/u/132247739?v=4'
            />
          </Tooltip>
          <Tooltip title='Thanh'>
            <Avatar
              alt='Thanh'
              src='https://avatars.githubusercontent.com/u/132247739?v=4'
            />
          </Tooltip>
          <Tooltip title='Thanh'>
            <Avatar
              alt='Thanh'
              src='https://avatars.githubusercontent.com/u/132247739?v=4'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
