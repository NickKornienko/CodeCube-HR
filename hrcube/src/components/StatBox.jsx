import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" borderRadius="30px" alignItems="center" justifyContent="center">
      <Box display="flex" mt="20px" justifyContent="center" alignItems="center">
        <Box width="100%" justifyContent="center" alignItems="center">
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" mt="2px">
        <Typography variant="h7" sx={{ color: colors.purpleAccent[200] }}>
          {subtitle}
        </Typography>
        
      </Box>
    </Box>
  );
};

export default StatBox;
