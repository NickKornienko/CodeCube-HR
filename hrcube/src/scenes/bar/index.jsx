import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const Bar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dataset = [
    { day: "(11/13)", hours: 8 },
    { day: "(11/14)", hours: 8 },
    { day: "(11/15)", hours: 9 },
    { day: "(11/16)", hours: 7 },
    { day: "(11/17)", hours: 5 },
    { day: "(11/18)", hours: 0 },
    { day: "(11/19)", hours: 0 },
    { day: "(11/20)", hours: 8 },
    { day: "(11/21)", hours: 8 },
    { day: "(11/22)", hours: 9 },
    { day: "(11/23)", hours: 7 },
    { day: "(11/24)", hours: 5 },
    { day: "(11/25)", hours: 0 },
    { day: "(11/26)", hours: 0 },
  ];
  const valueFormatter = (value) => `${value}h`;
  const chartSetting = {
    yAxis: [
      {
        autogap: false,
      },
    ],
  };

  return (
    <Box
      sx={{
        maxWidth: "100%", // Prevents the box from exceeding the width of the parent
        maxHeight: "100vh", // Sets the maximum height to the viewport height
        overflow: "auto", // Adds scrollbar if content overflows

        boxSizing: "border-box", // Includes padding and border in the box's size>
        justifyContent: "center",
      }}
    >
      <BarChart
        sx={{
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.4",
            fill: "grey",
          },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.4",
            fill: "grey",
            fontSize: "2px",
          },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
            stroke: "grey",
            strokeWidth: 0.4,
          },
          // leftAxis Line Styles
          "& .MuiChartsAxis-left .MuiChartsAxis-line": {
            stroke: "grey",
            strokeWidth: 0.4,
          },
          "& .MuiChartsAxis-left .MuiChartsAxis-tick": {
            stroke: "grey",
          },
        }}
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "day", barGapRatio: 0 }]}
        series={[
          { dataKey: "hours", color: colors.purpleAccent[500], valueFormatter },
        ]}
        {...chartSetting}
        width={780}
        height={400}
      />
    </Box>
  );
};

export default Bar;
