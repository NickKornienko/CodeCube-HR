import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import DbService from "../../DbService";
import Header from "../../components/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

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
      <Typography
          variant="h3"
          color={colors.primary[500]}
          sx={{ m: "0 0 5px 0" }}
        >
          Submit Hours Worked
        </Typography>
       <Box m="20px"
       >
         <TextField
  
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  sx={{
    mr: 2,
    
    '& label.Mui-focused': {
      color: colors.primary[500], // color when the input is focused
    },
    '& label': {
      color: 'rgba(0, 0, 0, 0.54)', // default label color
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: colors.primary[500], // color of the underline when input is focused
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)', // default border color
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.87)', // border color when hovered
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary[500], // border color when the input is focused
      },
    },
    '& .MuiInputBase-input': { // This targets the input inside the TextField
      color: colors.primary[500], // input text color
    },
  }}
/>
<TextField
  label="Hours Worked"
  type="number"
  value={hours}
  onChange={(e) => setHours(e.target.value)}
  sx={{
    mr: 2,
    alignContent: "center",
    width:"120px",
    '& label.Mui-focused': {
      color: colors.primary[500], // color when the input is focused
    },
    '& label': {
      color: 'rgba(0, 0, 0, 0.54)', // default label color
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: colors.primary[500], // color of the underline when input is focused
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)', // default border color
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.87)', // border color when hovered
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary[500], // border color when the input is focused
      },
    },
    '& .MuiInputBase-input': { // This targets the input inside the TextField
      color: colors.primary[500], // input text color
    },
  }}
/>
       </Box>
        <Box m="20px">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        </Box>
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
        <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            mb="10px"
          >
            <Box width="30%">
            <Typography fontWeight="bold" color={colors.primary[500]}>
              Date
            </Typography>
            
            </Box>
            <Typography fontWeight="bold" color={colors.primary[500]}>
              Hours
            </Typography>
            <Typography fontWeight="bold" color={colors.primary[500]}>
              Department #
            </Typography>
            <Typography fontWeight="bold" color={colors.primary[500]}>
              Employee #
            </Typography>
            
            <Typography fontWeight="bold" color={colors.primary[500]}>
              Manager
            </Typography>
          </Box>
        {timesheets.map((timesheet, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            width="100%"
            mb="10px"
          >
            <Box width="30%">
            <Typography color={colors.primary[500]}>
              {timesheet.date} </Typography>
            </Box>
            <Typography color={colors.primary[500]}>
              {timesheet.no_hours}
            </Typography>
           
            <Typography color={colors.primary[500]}>
              {timesheet.dept_no}
            </Typography>
            <Typography color={colors.primary[500]}>
              {timesheet.emp_no}
            </Typography>
            
            <Typography color={colors.primary[500]}>
              {timesheet.manager_emp_no}
            </Typography>
          </Box>
        ))}
        <Divider variant="fullWidth" sx={{ bgcolor: 'grey' }} />
      </Box>
    </Box>
  );
};

export default Invoices;
