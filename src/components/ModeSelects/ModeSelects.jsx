import {useColorScheme} from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import Box from "@mui/material/Box";

const ModeSelect = () => {
  const {mode, setMode} = useColorScheme();
  const handleChange = (event) => {
    const selectMode = event.target.value;
    setMode(selectMode);
  };

  return (
    <div>
      <FormControl size='small'>
        <InputLabel
          sx={{color: "#fff", "&.Mui-focused": {color: "#fff"}}}
          id='demo-simple-select-autowidth-label'>
          Mode
        </InputLabel>
        <Select
          labelId='demo-simple-select-autowidth-label'
          id='demo-simple-select-autowidth'
          value={mode}
          onChange={handleChange}
          sx={{
            color: "#fff",
            ".MuiOutlinedInput-notchedOutline": {borderColor: "#fff"},
            "&:hover .MuiOutlinedInput-notchedOutline": {borderColor: "#fff"},
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            ".MuiSvgIcon-root": {color: "#fff"},
          }}
          autoWidth
          label='Mode'>
          <MenuItem value='light'>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
              Light
              <LightModeIcon fontSize='small' />
            </Box>
          </MenuItem>
          <MenuItem value='dark'>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
              Dark
              <DarkModeIcon fontSize='small' />
            </Box>
          </MenuItem>
          <MenuItem value='system'>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
              System
              <SettingsBrightnessIcon fontSize='small' />
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ModeSelect;
