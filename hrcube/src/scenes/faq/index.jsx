import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary sx={{ backgroundColor: colors.white}} expandIcon={<ExpandMoreIcon sx={{ color: colors.primary[500] }}/>}>
          <Typography color={colors.primary[500]} variant="h5">
          Is It Possible to Track Employee Attendance and Leave in HRCubicle?
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: colors.white}}>
          <Typography color={colors.primary[500]}>
          Absolutely! HRCubicle provides an attendance and leave management system. To track attendance, navigate to the Timesheet section. Here, you can view daily attendance logs, and generate monthly attendance reports. For leave management, go to the ‘Leave’ section where you can approve or reject leave applications, and view leave balances for each employee.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary sx={{ backgroundColor: colors.white}} expandIcon={<ExpandMoreIcon sx={{ color: colors.primary[500] }}/>}>
          <Typography color={colors.primary[500]} variant="h5">
          Can I Customize Access Permissions for Different Users in HRCubicle?
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: colors.white}}>
          <Typography color={colors.primary[500]}>
          Yes, HRCubicle allows for customizable user access permissions. As an admin, you can assign and modify roles and permissions by navigating to the ‘User Management’ section. Select a user and click ‘Edit’ to change their access level. This feature helps ensure that employees only have access to the relevant sections of the application as per their role.
          </Typography>
        </AccordionDetails>
      </Accordion>
    
    </Box>
  );
};

export default FAQ;
