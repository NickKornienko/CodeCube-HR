import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useEffect, useState, useContext } from "react";
import AuthService from "../../AuthService.js";
import Divider from "@mui/material/Divider";
import SsoLinkPage from "../sso_link/index.jsx";

const Account = () => {
  const [userName, setUserName] = useState("Loading...");
  const [employeeId, setEmployeeId] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    AuthService.getUserInfo().then(
      (response) => {
        setUserName(response.data.name);
        setEmployeeId(response.data.emp_no);
        setEmail(response.data.email);
      },
      (error) => {
        console.error("Error fetching user info:", error);
      }
    );
  }, []);
  return (
    <Box m="20px">
      <Header title="Account" subtitle="View your profile information" />
      <Divider variant="fullWidth" sx={{ bgcolor: "grey" }} />
      <Box>
        <Box>
          <Box
            display="flex"
            alignItems="center"
            height="100%"
            mt="20px"
            mb="10px"
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color={colors.purpleAccent[500]}
              style={{ lineHeight: "1" }}
            >
              Personal Information
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            height="100%"
            mt="20px"
            mb="10px"
          >
            <Typography
              variant="h5"
              color={colors.purpleAccent[500]}
              style={{ lineHeight: "1" }}
            >
              Name and Role
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" height="100%" mb="20px">
            <Typography
              variant="h4"
              color={colors.primary[500]}
              style={{ lineHeight: "1" }}
            >
              {userName}, Senior Product Manager
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box display="flex" alignItems="center" height="100%" mb="10px">
            <Typography
              variant="h5"
              color={colors.purpleAccent[500]}
              style={{ lineHeight: "1" }}
            >
              ID Number
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" height="100%" mb="40px">
            <Typography
              variant="h4"
              color={colors.primary[500]}
              style={{ lineHeight: "1" }}
            >
              {employeeId}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Divider variant="fullWidth" sx={{ bgcolor: "grey" }} />

          <Box
            display="flex"
            alignItems="center"
            height="100%"
            mt="20px"
            mb="10px"
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color={colors.purpleAccent[500]}
              style={{ lineHeight: "1" }}
            >
              Contact Information
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" height="100%" mb="20px">
            <Typography
              variant="h5"
              color={colors.primary[500]}
              style={{ lineHeight: "1" }}
            >
              Email:
            </Typography>
            <Box>
              <Typography
                variant="h5"
                color={colors.primary[500]}
                style={{ lineHeight: "1" }}
              >
                {email}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" height="100%" mb="20px">
            <Typography
              variant="h5"
              color={colors.primary[500]}
              style={{ lineHeight: "1" }}
            >
              Phone Number:
            </Typography>
            <Box>
              <Typography
                variant="h5"
                color={colors.primary[500]}
                style={{ lineHeight: "1" }}
              >
                (408) 123 - 4567
              </Typography>
            </Box>
          </Box>

          <Divider variant="fullWidth" sx={{ bgcolor: "grey", my: 4 }} />
          <SsoLinkPage />
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
