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
import StatBox from "../../components/StatBox";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from "@mui/material/InputBase";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Bar from "../../scenes/bar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Icon from '@mui/material/Icon';
import AlignItemsList from "../../components/AlignItemsList";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: colors.grey[300],
    overflow: "hidden",
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
        height="73vh"
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
            overflow= 'auto'

          >
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={colors.primary[500]}
              >
                Timesheet
              </Typography>
              <Box display="flex" justifyContent="space-between"  alignItems="left" width="220px">
              <Icon>
          <CalendarMonthIcon color="primary"/>
        </Icon>
             <Typography mt="2px" variant="h5"
                color={colors.primary[500]}>
                 11/13/2023 - 11/26/2023
            </Typography>
    </Box>
              <Box>
                <Bar></Bar>
               

              </Box>
              
            </Box>
            <Box>
        
            </Box>
          </Box>
        </Box>
      

        {/* ROW 3 */}
      
      </Box>
    </Box>
        </Item>
      </Grid>
      <Grid item xs>
        <Item elevation={0}  >
          <Box backgroundColor={colors.white} height="92vh"  overflow="auto">
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
      <AlignItemsList></AlignItemsList>

      </Box>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
