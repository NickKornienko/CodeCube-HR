import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import GridViewIcon from '@mui/icons-material/GridView';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputBase from "@mui/material/InputBase";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: colors.grey[300],
  }));
  

  return (
    
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Item elevation={0}>
        <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Welcome Back" subtitle="Get started on new tasks" />

      </Box>
      <Box mb="20px">
        <Typography color={colors.primary[500]} variant="h4" fontWeight="bold">
          Quick Actions
        </Typography>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.blueAccent[500]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="15px"
          boxShadow={theme.shadows[2]}
        
        >
          <StatBox
            title="Payroll Gateway"
            subtitle="View your earnings"
            icon={
              <PaidOutlinedIcon
                sx={{ color: colors.grey[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.purpleAccent[500]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="15px"
          boxShadow={theme.shadows[2]}
        >
          <StatBox
            title="Organization"
            subtitle="View or manage your organization"
            icon={
              <PeopleOutlinedIcon
                sx={{ color: colors.grey[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="15px"
          boxShadow={theme.shadows[2]}
        >
          <StatBox
            title="FAQ Page"
            subtitle="Ask or view common questions"
            icon={
              <HelpOutlineOutlinedIcon
                sx={{ color: colors.grey[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
    

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
    
          backgroundColor={colors.white}
          boxShadow={theme.shadows[2]}
          borderRadius="15px"
          height="500px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={colors.primary[500]}
              >
                Timesheet
              </Typography>
            </Box>
            <Box>
        
            </Box>
          </Box>
          <Box height="450px" m="-20px 0 0 0">
           
          </Box>
        </Box>
      

        {/* ROW 3 */}
      
      </Box>
    </Box>
        </Item>
      </Grid>
      <Grid item xs>
        <Item elevation={0}  >
          <Box backgroundColor={colors.white} height="92vh" >
            <Box p="20px">
            {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.purpleAccent[200]}
        borderRadius="5px"
        width="100%"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Give a shoutout" color={colors.white} />
        <IconButton type="button" sx={{ p: 1 }}>
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      </Box>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
