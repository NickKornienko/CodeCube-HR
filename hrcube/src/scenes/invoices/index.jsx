import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import DbService from "../../DbService";
import Header from "../../components/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [timesheets, setTimesheets] = useState([]);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = () => {
    const { startDate, endDate } = getCurrentWeek();
    DbService.getTimesheetsForUser(startDate, endDate)
      .then((response) => {
        setTimesheets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching timesheets:", error);
      });
  };

  const handleSubmit = async () => {
    try {
      const timesheet = { date, hours };
      await DbService.sendTimesheetData(timesheet);
      setDate("");
      setHours("");
      fetchTimesheets();
    } catch (error) {
      console.error("Error submitting timesheet:", error);
    }
  };

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
      {/* Timesheet Submission Form */}
      <Box m="20px">
        <Typography variant="h4" color={colors.primary[400]} sx={{ mb: 2 }}>
          Submit Hours Worked
        </Typography>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Hours Worked"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      {/* Timesheet Display */}
      <Box m="20px">
        <Typography
          variant="h3"
          color={colors.primary[500]}
          sx={{ m: "0 0 5px 0" }}
        >
          Timesheet
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
