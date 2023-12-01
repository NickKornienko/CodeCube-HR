import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const Organization = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box >
      <Box ml="20px" mt="20px">
      <Typography
          variant="h3"
          color={colors.primary[500]}
          sx={{ m: "0 0 0px 0" }}
        >
          Paid Time Off
        </Typography>
      </Box>
      <Box ml="20px">
      <Typography
          variant="h6"
          color={colors.purpleAccent[500]}
          sx={{ m: "0 0 0px 0" }}
        >
          Request paid time off by submitting a request below.
        </Typography>
      </Box>
      <Box m="20px" component="form" width="65%" display="flex" justifyContent="space-between">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Vacation Start Date" 
      sx={{
        '& label': { // styles for the label
          color: colors.primary[500],
        },
        '& .MuiOutlinedInput-root': { // styles for the input field
          '& fieldset': { // styles for the normal state
            borderColor: colors.primary[500],
          },
        },
        '& .MuiInputBase-input': {
          color: colors.primary[500], // Change input text color here
        },
        width: '45%'
        
      }} />
    </LocalizationProvider>

  
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Vacation End Date" 
      sx={{
        '& label': { // styles for the label
          color: colors.primary[500],
        },
        '& .MuiOutlinedInput-root': { // styles for the input field
          '& fieldset': { // styles for the normal state
            borderColor: colors.primary[500],
          },
        },
        '& .MuiInputBase-input': {
          color: colors.primary[500], // Change input text color here
        },
        width: '45%'
        
      }} />
    </LocalizationProvider>
        </Box>
      
      <Box m="13px" 
   
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '65%' },
      }}
      noValidate
      autoComplete="off"
      color={colors.primary[500]}
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Leave Type"
          defaultValue="Vacation, Sick, Personal"
          sx={{
            '& label': { // styles for the label
              color: colors.primary[500],
            },
            '& .MuiOutlinedInput-root': { // styles for the input field
              '& fieldset': { // styles for the normal state
                borderColor: colors.primary[500],
              },
            },
            '& .MuiInputBase-input': {
              color: colors.primary[500], // Change input text color here
            },
          }}
        />
     
        </div>
        <TextField

          id="outlined"
          label="Additional Comments"
          defaultValue="Add any additional comments here."
          sx={{
            '& label': { // styles for the label
              color: colors.primary[500],
            },
            '& .MuiOutlinedInput-root': { // styles for the input field
              '& fieldset': { // styles for the normal state
                borderColor: colors.primary[500],
              },
            },
            '& .MuiInputBase-input': {
              color: colors.primary[500], // Change input text color here
            },
          }}
        />
        <div>

        </div>
        
    </Box>
    <Box m="20px" display="flex" width="65%" >
    <Button variant="contained"  color="primary" sx={{ m: "0 0 0px 0" }}>Request</Button>
      </Box>

    </Box>
  );
  

};

export default Organization;
