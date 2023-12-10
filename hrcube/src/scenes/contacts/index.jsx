import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DbService from "../../DbService";
import { tokens } from "../../theme";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [annualSalary, setAnnualSalary] = useState(0);
  const [paycheck, setPaycheck] = useState(0);

  const now = new Date();
  const currentPeriodStart = startOfWeek(now, { weekStartsOn: 1 });
  const currentPeriodEnd = endOfWeek(now, { weekStartsOn: 1 });
  const payPeriodStart = addDays(currentPeriodStart, -7);
  const payPeriodEnd = currentPeriodEnd;
  const formatDates = (startDate, endDate) => {
    return `${format(startDate, "MM/dd/yyyy")} - ${format(
      endDate,
      "MM/dd/yyyy"
    )}`;
  };

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const salary = await (await DbService.getSalaryForUser()).data.salary;
        setAnnualSalary(salary);
        setPaycheck(salary / 26);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    };

    fetchSalary();
  }, []);

  return (
    <Box>
      <Box m="20px">
        <Typography variant="h3" color={colors.primary[500]}>
          Payroll
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
          backgroundColor: colors.purpleAccent[500],
        }}
      >
        <Box m="20px 40px">
          <Box display="flex" sx={{ m: "0px 0px 15px 0px" }}>
            <CalendarMonthIcon color="primary" />
            <Typography
              color={colors.primary[500]}
              variant="h6"
              sx={{ m: "0px 0px 5px 10px" }}
            >
              {/* Dynamic pay period dates */}
              {formatDates(payPeriodStart, payPeriodEnd)}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h4"
              color={colors.white[500]}
              fontWeight="bold"
            >
              Estimated earnings this period (pre-tax)
            </Typography>
            <Typography fontSize="48px" color={colors.white[500]}>
              ${paycheck.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" color={colors.white[500]}>
              Annual Salary: ${annualSalary.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contacts;
