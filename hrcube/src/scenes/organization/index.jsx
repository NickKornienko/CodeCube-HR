import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import DbService from "../../DbService.js";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Organization = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userComments, setUserComments] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ptoRequests, setPtoRequests] = useState([]);

  useEffect(() => {
    const { startDate, endDate } = getCurrentWeek();
    DbService.getTimeoffForUser(startDate, endDate)
      .then((response) => {
        setPtoRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching PTO requests:", error);
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

  const handlePTORequestSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(false);
    setErrorMsg("");
    const ptoRequestData = {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      user_comments: userComments,
    };

    try {
      const response = await DbService.sendTimeoffData(ptoRequestData);
      if (response.status === 201) {
        if (
          ptoRequestData.startDate >= getCurrentWeek().startDate ||
          ptoRequestData.endDate <= getCurrentWeek().endDate
        ) {
          setPtoRequests([...ptoRequests, ptoRequestData]);
        }

        setStartDate(null);
        setEndDate(null);
        setUserComments("");
        setIsSubmitted(true);
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          "Error submitting PTO request. Please try again."
      );
    }
  };

  return (
    <Box>
      <Header />
      <Box ml="20px" mt="20px">
        <Typography variant="h3" color={colors.primary[500]}>
          Paid Time Off
        </Typography>
        <Typography variant="h6" color={colors.purpleAccent[500]}>
          Request paid time off by submitting the form below.
        </Typography>
      </Box>
      <Box
        m="20px"
        component="form"
        onSubmit={handlePTORequestSubmit}
        width="65%"
        display="flex"
        flexDirection="column"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Vacation Start Date"
            value={startDate}
            onChange={setStartDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Vacation End Date"
            value={endDate}
            onChange={setEndDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="comments-field"
          label="Additional Comments"
          value={userComments}
          onChange={(e) => setUserComments(e.target.value)}
        />
        {isSubmitted && (
          <Typography color={theme.palette.success.main} sx={{ mt: 2 }}>
            Your PTO request has been submitted successfully.
          </Typography>
        )}
        {errorMsg && (
          <Typography color={theme.palette.error.main} sx={{ mt: 2 }}>
            {errorMsg}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Request
        </Button>
      </Box>

      {/* Section to display PTO requests */}
      <Box m="20px">
        <Typography variant="h4" color={colors.primary[400]} fontWeight="bold">
          Current PTO Requests
        </Typography>
        <Box
          backgroundColor={colors.white}
          boxShadow={theme.shadows[2]}
          borderRadius="15px"
          m="20px"
          p="20px"
        >
          {ptoRequests.map((request, index) => (
            <Box key={index} display="flex" justifyContent="space-between">
              <Typography color={colors.primary[500]}>
                Start: {request.start_date}
              </Typography>
              <Typography color={colors.primary[500]}>
                End: {request.end_date}
              </Typography>
              <Typography color={colors.primary[500]}>
                Comments: {request.user_comments}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Organization;
