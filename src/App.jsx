import {useColorScheme} from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import Box from "@mui/material/Box";
import {Container} from "@mui/system";

function ModeSelect() {
  const {mode, setMode} = useColorScheme();

  const handleChange = (event) => {
    const selectMode = event.target.value;
    setMode(selectMode);
  };

  return (
    <div>
      <FormControl sx={{m: 1, minWidth: 80}}>
        <InputLabel id='demo-simple-select-autowidth-label'>Age</InputLabel>
        <Select
          labelId='demo-simple-select-autowidth-label'
          id='demo-simple-select-autowidth'
          value={mode}
          onChange={handleChange}
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
              dark
              <DarkModeIcon fontSize='small' />
            </Box>
          </MenuItem>
          <MenuItem value='system'>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
              system
              <SettingsBrightnessIcon fontSize='small' />
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

function App() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{height: "100vh", backgroundColor: "primary.main"}}>
      <Box
        sx={{
          backgroundColor: "primary.light",
          width: "100%",
          height: (theme) => theme.trello.appBarHeight,
          display: "flex",
          alignItems: "center",
        }}>
        <ModeSelect />
      </Box>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          width: "100%",
          height: (theme) => theme.trello.boarBatHeight,
          display: "flex",
          alignItems: "center",
        }}>
        Board Bar
      </Box>
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
    </Container>
  );
}

export default App;
