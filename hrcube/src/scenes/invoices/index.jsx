import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import DbService from "../../DbService";
import Header from "../../components/Header";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const { startDate, endDate } = getCurrentWeek();
    DbService.getTimesheetsForUser(startDate, endDate)
      .then((response) => {
        setTimesheets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching timesheets:", error);
      });
  }, []);

  const getCurrentWeek = () => {
    const currentDate = new Date();
    const firstDayOfWeek =
      currentDate.getDate() -
      currentDate.getDay() +
      (currentDate.getDay() === 0 ? -6 : 1);
    const lastDayOfWeek = firstDayOfWeek + 6;

    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      firstDayOfWeek
    )
      .toISOString()
      .split("T")[0];

    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      lastDayOfWeek
    )
      .toISOString()
      .split("T")[0];

    return {
      startDate,
      endDate,
    };
  };

  return (
    <Box>
      <Header />
      <Box m="20px">
        <Typography
          variant="h3"
          color={colors.primary[500]}
          sx={{ m: "0 0 5px 0" }}
        >
          Timesheet
        </Typography>
      </Box>
      <Box m="20px">
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
        {timesheets.map((timesheet, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <Typography color={colors.primary[500]}>
              {timesheet.date}
            </Typography>
            <Typography color={colors.primary[500]}>
              {timesheet.dept_no}
            </Typography>
            <Typography color={colors.primary[500]}>
              {timesheet.emp_no}
            </Typography>
            <Typography color={colors.primary[500]}>
              {timesheet.no_hours}
            </Typography>
            <Typography color={colors.primary[500]}>
              {timesheet.manager_emp_no}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Invoices;
