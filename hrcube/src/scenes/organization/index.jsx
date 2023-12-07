import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import DbService from "../../DbService.js";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import Divider from "@mui/material/Divider";
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
  const getStatusLabel = (approvalCode) => {
    switch (approvalCode) {
      case 0:
        return "Pending";
      case 1:
        return <Typography color={colors.greenAccent}> Approved </Typography>;
      case 2:
        return "Denied";
      default:
        return "Unknown";
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

  const handlePTORequestSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(false);
    setErrorMsg("");

    // Assuming startDate and endDate are Dayjs objects due to the use of AdapterDayjs
    const formattedStartDate = startDate?.format("YYYY-MM-DD");
    const formattedEndDate = endDate?.format("YYYY-MM-DD");

    const ptoRequestData = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      user_comments: userComments,
    };

    try {
      const response = await DbService.sendTimeoffData({
        ...ptoRequestData,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      });

      if (response.status === 201) {
        const { startDate: currentWeekStart, endDate: currentWeekEnd } =
          getCurrentWeek();
        if (
          (formattedStartDate <= currentWeekEnd &&
            formattedStartDate >= currentWeekStart) ||
          (formattedEndDate >= currentWeekStart &&
            formattedEndDate <= currentWeekEnd) ||
          (formattedStartDate <= currentWeekStart &&
            formattedEndDate >= currentWeekEnd)
        ) {
          setPtoRequests((currentPtoRequests) => [
            ...currentPtoRequests,
            response.data,
          ]);
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
        ml="40px"
        mt="20px"
        component="form"
        onSubmit={handlePTORequestSubmit}
        width="85%"
        display="space-between"
        flexDirection="column"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Vacation Start Date"
            value={startDate}
            onChange={setStartDate}
            slots={{
              TextField: (params) => <TextField {...params} />,
            }}
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
          <DatePicker
            label="Vacation End Date"
            value={endDate}
            onChange={setEndDate}
            slots={{
              TextField: (params) => <TextField {...params} />,
            }}
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
        </LocalizationProvider>
        <TextField
          id="comments-field"
          
          label="Additional Comments"
          value={userComments}
          onChange={(e) => setUserComments(e.target.value)}
          sx={{
            mr: 2,
            width:"30%",
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Request
        </Button>
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
          height="300px"
        >
          <Box mb="10px" display="flex" justifyContent="space-between">
 <Typography color={colors.primary[500]} fontWeight={"bold"}>
                Start
              </Typography>
              <Typography color={colors.primary[500]} fontWeight={"bold"}>
                End
              </Typography>
              <Typography color={colors.primary[500]} fontWeight={"bold"}>
                Comments
              </Typography>
              <Typography color={colors.primary[500]} fontWeight={"bold"}>
                Approval
              </Typography>
            </Box>
          {ptoRequests.map((request, index) => (
            <Box key={index} display="flex" justifyContent="space-between">
              <Box width="120px">
                <Typography color={colors.primary[500]}>
                  {request.start_date}
                </Typography>
              </Box>
              <Box width="110px">
                <Typography color={colors.primary[500]}>
                  {request.end_date}
                </Typography>
              </Box>
              <Box width="180px">
                <Typography color={colors.primary[500]}>
                  {request.user_comments}
                </Typography>
              </Box>
              <Box >
                <Typography color={colors.primary[500]}>
                  {getStatusLabel(request.approval)}
                  
                </Typography>
              </Box>     
            </Box>
          ))}
          
           
        </Box>
      </Box>
    </Box>
  );
};

export default Organization;
