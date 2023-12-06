import React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Header
                title="Welcome Back"
                subtitle="Get started on new tasks"
              />
            </Box>

            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridAutoRows="140px"
              gap="20px"
              height="73vh"
            >
              {/* StatBoxes and other content here */}
            </Box>
          </Box>
        </Item>
      </Grid>
      <Grid item xs>
        <Item elevation={0}>
          <Box backgroundColor={colors.white} height="92vh" overflow="auto">
            <Box p="20px">
              <AlignItemsList />
            </Box>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
