import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2} backgroundColor={colors.grey[100]}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.purpleAccent[200]}
        borderRadius="30px"
        width="70%"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search what you are looking for today" color={colors.white} />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
      <IconButton>
          <EmailOutlinedIcon color="primary" />
        </IconButton>
      
        <IconButton>
          <NotificationsOutlinedIcon color="primary"/>
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
