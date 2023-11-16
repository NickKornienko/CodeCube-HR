import { Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import Button from '@mui/material/Button';
import KeyIcon from '@mui/icons-material/Key';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{
      width: '100vw', // 100% of the viewport width
      height: '100vh', // 100% of the viewport height
      display: 'flex', // Using flex to center content
      flexDirection: 'column', // Stack children vertically
      alignItems: 'center', // Center children horizontally
      justifyContent: 'center', // Center children vertically
      backgroundColor: colors.primary[500]
    }}  >
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center', // Aligns the icon and text vertically
      m: "0 0 20px 0px" // Margin applied to the Box instead of Typography
    }}
    >
    <ViewInArRoundedIcon sx={{ marginRight: 1 }} /> {/* Icon with a right margin */}
    <Typography
    variant="h3"
    color={colors.blueAccent[200]}
    fontWeight="bold"
    >
    HRCubicle
    </Typography>
    </Box>
    <Box 
     mb={7}
    sx={{
      width: '400px', // 100% of the viewport width
      height: '50vh', // 100% of the viewport height
      display: 'flex', // Using flex to center content
      flexDirection: 'column', // Stack children vertically
      alignItems: 'center', // Center children horizontally
      justifyContent: 'center', // Center children vertically
      backgroundColor: colors.purpleAccent[500],
      borderRadius: '15px',
    }} >
    <Typography
    variant="h4"
    color={colors.primary[500]}
    fontWeight="bold"
    sx={{ m: "0 0 5px 0px" }}
    > 
    Welcome to HRCubible 
    </Typography>
    <Typography
    fontSize="10"
    color={colors.primary[500]}
    sx={{ m: "0 0 30px 0px" }}
    > 
    Online cubicle for your HR needs 
    </Typography>
    <Box
    display="flex"
    backgroundColor={colors.purpleAccent[200]}
    borderRadius="7px"
    width="75%"
    height="10%"
    mb={1}
    >
    <InputBase
    sx={{ 
      ml: 2, 
      flex: 1,
      color: colors.purpleAccent[900], // change to your desired color
      '& .MuiInputBase-input': {
        color: colors.purpleAccent[900]// this targets the input element specifically
      }
    }}
    placeholder="Username"
    />
    </Box>
    <Box
    display="flex"
    backgroundColor={colors.purpleAccent[200]}
    borderRadius="7px"
    width="75%"
    height="10%"
    mb={4}
    >
    <InputBase
    sx={{ 
      ml: 2, 
      flex: 1,
      color: colors.purpleAccent[900], // change to your desired color
      '& .MuiInputBase-input': {
        color: colors.purpleAccent[900]// this targets the input element specifically
      }
    }}
    placeholder="Password"
    />
    </Box>
    <Box
    display="flex"
    justifyContent="center" // Center the button horizontally
    alignItems="center" // Center the button vertically
    backgroundColor={colors.purpleAccent[200]}
    borderRadius="7px"
    width="75%"
    height="10%"
    mb={4}
    >
    <Button
    variant="contained"
    sx={{
      width: '100%', // Stretch button to fill the Box
      height: '100%', // Stretch button to fill the Box
      textTransform: 'none',
      fontFamily: ["Inter"].join(","),
      fontSize: '13px',
      borderRadius: '7px'
      
    }}
    >
    Login
    </Button>
    </Box>
    <Button
    endIcon={<KeyIcon />} // Add the icon to the start of the button
    sx={{
      // Add any additional styling you need here
      textTransform: 'none',
      justifyContent: 'flex-start' // Aligns text and icon to the left
    }}
    >
    or login with SSO
    </Button>
    
    
    </Box>
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center', // Aligns the icon and text vertically
      m: "0 0 20px 0px" // Margin applied to the Box instead of Typography
    }}
    >
    <Typography
    fontSize="14px"
    color={colors.white}
    >
    Powered by CodeCube
    </Typography>
   
    </Box>
    
    
    </Box>
    );
  };
  
  export default Login;