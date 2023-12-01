import { Box, Icon, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const Contacts = () => {
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
          Payroll
        </Typography>
      </Box>
      
      <Box sx={{
        width: "100%",
        height: "30vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "center",
        backgroundColor: colors.purpleAccent[500],
       
      }} >
        <Box  m= "20px 40px 20px 40px">
        <Box sx={{ m: "0px 0px 15px 0px" }} >
       <CalendarMonthIcon color="primary"></CalendarMonthIcon> 
 
        </Box>
        <Box >
        <Typography
          variant="h4"
          color={colors.white[500]}
          fontWeight="bold"
          sx={{ m: "0px 0px 10px 0px" }}
        >
          Estimated earnings this period
        </Typography>
        </Box>
        <Box >
        <Typography
          fontSize="48px"
          color={colors.white[500]}
          sx={{ m: "0px 0px 15px 0px" }}
        >
          $0.00
        </Typography>
        </Box>
        <Box >
        <Typography
          variant="h5"
          color={colors.primary[500]}
          sx={{ m: "0px 0px 15px 0px" }}
        >
          0 hrs worked
        </Typography>
        </Box>
        </Box>
    </Box>
    <Box>
    <Box sx={{ m: "40px 20px 20px 40px" }} >
    <Typography
          variant="h4"
          color={colors.primary[400]}
          fontWeight="bold"
          sx={{ m: "0px 0px 10px 0px" }}
        >
          Past Pay Periods
        </Typography>

    </Box>
    <Box
          backgroundColor={colors.white}
          boxShadow={theme.shadows[2]}
          borderRadius="15px"
          height="35vh"
          m="0px 40px 20px 40px"
        >

        </Box>
    </Box>
    </Box>
    
    
  );
};

export default Contacts;
