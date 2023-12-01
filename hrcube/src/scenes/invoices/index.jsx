import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box >
      <Box m="20px">
      <Typography
          variant="h3"
          color={colors.primary[500]}
          sx={{ m: "0 0 5px 0" }}
        >
          Timesheet
        </Typography>
      </Box>
      <Box>
    <Box m="20px" >
    <Typography
          variant="h4"
          color={colors.primary[400]}
          fontWeight="bold"
          sx={{ m: "0px 0px 10px 20px" }}
        >
          Upcoming Shifts
        </Typography>

    </Box>
    <Box
          backgroundColor={colors.white}
          boxShadow={theme.shadows[2]}
          borderRadius="15px"
          height="33vh"
          m="0px 40px 20px 40px"
          p="25px 40px 25px 40px"
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box width="20%">
            <Typography color={colors.primary[500]}>
            Date
          </Typography>

            </Box>
         
          <Typography color={colors.primary[500]}>
            Clock In
          </Typography>
          <Typography color={colors.primary[500]}>
            Clock Out
          </Typography>
          <Typography color={colors.primary[500]}>
            Total Hours
          </Typography>
          <Typography color={colors.primary[500]}>
            Approved
          </Typography>

          </Box>

        </Box>
        <Box m="20px" >
    <Typography
          variant="h4"
          color={colors.primary[400]}
          fontWeight="bold"
          sx={{ m: "40px 0px 10px 20px" }}
        >
          Approved Hours
        </Typography>

    </Box>
    <Box
          backgroundColor={colors.white}
          boxShadow={theme.shadows[2]}
          borderRadius="15px"
          height="33vh"
          m="0px 40px 20px 40px"
          p="25px 40px 25px 40px"
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box width="20%">
            <Typography color={colors.primary[500]}>
            Date
          </Typography>

            </Box>
         
          <Typography color={colors.primary[500]}>
            Clock In
          </Typography>
          <Typography color={colors.primary[500]}>
            Clock Out
          </Typography>
          <Typography color={colors.primary[500]}>
            Total Hours
          </Typography>
          <Typography color={colors.primary[500]}>
            Approved
          </Typography>

          </Box>

        </Box>
    </Box>
    
    </Box>
    
  );
 
};

export default Invoices;
