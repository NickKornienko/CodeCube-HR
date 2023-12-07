import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import AuthService from "../../AuthService.js";
import AccountMenu from "../../components/AccountMenu";

const Topbar = () => {
  const [userName, setUserName] = useState("Loading...");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const handleLinkGoogleAccount = () => {
    navigate("/sso_link");
  };

  useEffect(() => {
    AuthService.getUserInfo().then(
      (response) => {
        setUserName(response.data.name);
      },
      (error) => {
        console.error("Error fetching user info:", error);
      }
    );
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      backgroundColor={colors.grey[100]}
    >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.purpleAccent[200]}
        borderRadius="30px"
        width="70%"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search what you are looking for today"
          color={colors.white}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}

    

      <Box display="flex" alignItems="center">
         {/* Google SSO Link Icon (temp)*/}
      <IconButton onClick={handleLinkGoogleAccount}>
        <GoogleIcon color="primary" />
      </IconButton>
        <IconButton>
          <EmailOutlinedIcon color="primary" />
        </IconButton>

        <IconButton>
          <NotificationsOutlinedIcon color="primary" />
        </IconButton>

        <IconButton>
          <PersonOutlinedIcon color="primary" />
        </IconButton>

        {/* The Typography component is wrapped in a Box with flex properties for alignment */}
        <Box display="flex" alignItems="center" height="100%">
          <Typography variant="h5" color={colors.primary[500]} style={{ lineHeight: "1",  }}>
            {userName}
          </Typography>
        </Box>

        <AccountMenu />
      </Box>
    </Box>
  );
};

export default Topbar;
