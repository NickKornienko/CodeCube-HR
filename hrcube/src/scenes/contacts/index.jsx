import { Box, Icon, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Divider from '@mui/material/Divider';


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
        <Box display="flex" sx={{ m: "0px 0px 15px 0px" }} >
       <CalendarMonthIcon color="primary"></CalendarMonthIcon> 
       <Typography color={colors.primary[500]} variant="h6"  sx={{ m: "0px 0px 5px 10px" }}>
        11/13/2023 - 11/26/2023
      </Typography>
 
        </Box>
        <Box >
        <Typography
          variant="h4"
          color={colors.white[500]}
          fontWeight="bold"
          sx={{ m: "0px 0px 10px 0px" }}
        >
          Estimated earnings this period (pre-tax)
        </Typography>
        </Box>
        <Box >
        <Typography
          fontSize="48px"
          color={colors.white[500]}
          sx={{ m: "0px 0px 15px 0px" }}
        >
          $4000.00 
        </Typography>
        </Box>
        <Box >
        <Typography
          variant="h5"
          color={colors.primary[500]}
          sx={{ m: "0px 0px 15px 0px" }}
        >
          80 hrs worked
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
          p="25px 40px 25px 40px"
        >
           <Box display="flex" justifyContent="space-between" width="100%" mb="15px">
            <Box width="30%" >
            <Typography color={colors.primary[500]}>
            October 29, 2023 - November 12, 2023
          </Typography>

            </Box>
         
          <Typography color={colors.greenAccent[500]}>
            Approved
          </Typography>
          <Typography color={colors.primary[500]}>
            View
          </Typography>
          </Box>
          <Divider variant="fullWidth" sx={{ bgcolor: 'grey' }} />
          <Box display="flex" justifyContent="space-between" width="100%" mt="15px" mb="15px">
            <Box width="30%">
            <Typography color={colors.primary[500]}>
            October 04, 2023 - October 28, 2023
          </Typography>

            </Box>
         
          <Typography color={colors.greenAccent[500]}>
            Approved
          </Typography>
          <Typography color={colors.primary[500]}>
            View
          </Typography>
          </Box>
          <Divider variant="fullWidth" sx={{ bgcolor: 'grey' }} />
          <Box display="flex" justifyContent="space-between" width="100%" mt="15px" mb="15px">
            <Box width="30%" >
            <Typography color={colors.primary[500]}>
            September 19, 2023 - October 3, 2023
          </Typography>

            </Box>
         
          <Typography color={colors.greenAccent[500]}>
            Approved
          </Typography>
          <Typography color={colors.primary[500]}>
            View
          </Typography>
          </Box>
          <Divider variant="fullWidth" sx={{ bgcolor: 'grey' }} />
          <Box display="flex" justifyContent="space-between" width="100%" mt="15px" mb="15px">
            <Box width="30%" >
            <Typography color={colors.primary[500]}>
            September 02, 2023 - September 18, 2023
          </Typography>

            </Box>
         
          <Typography color={colors.greenAccent[500]}>
            Approved
          </Typography>
          <Typography color={colors.primary[500]}>
            View
          </Typography>
          </Box>
          <Divider variant="fullWidth" sx={{ bgcolor: 'grey' }} />
          

        </Box>
    </Box>
    </Box>
    
    
  );
};

export default Contacts;
