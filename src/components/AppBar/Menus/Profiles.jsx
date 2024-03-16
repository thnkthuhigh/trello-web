import Box from "@mui/system/Box";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";

const Profiles = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      {" "}
      <div>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{padding: 0}}
          aria-controls={open ? "basic-menu-profile" : undefined}
          aria-haspopup='true'
          aria-expanded={open ? "true" : undefined}>
          <Tooltip title='Account settings'>
            <Avatar
              alt='Thanh'
              src='https://avatars.githubusercontent.com/u/132247739?v=4'
              sx={{width: 32, height: 32}}>
              M
            </Avatar>
          </Tooltip>
        </IconButton>
        <Menu
          id='basic-menu-profile'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-menu-profile'",
          }}>
          <MenuItem>
            <Avatar sx={{width: 28, height: 28, mr: 2}} /> Profile
          </MenuItem>
          <MenuItem>
            <Avatar sx={{width: 28, height: 28, mr: 2}} /> My account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize='small' />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default Profiles;
