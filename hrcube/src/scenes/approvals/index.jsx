import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const ApprovalsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Mock data for PTO requests, replace with real data
  const ptoRequests = [
    { id: 1, name: "John Doe", requestDate: "2023-12-01", status: "Pending" },
    // ... more requests
  ];

  // Define columns for the DataGrid
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "requestDate", headerName: "Request Date", width: 150 },
    { field: "status", headerName: "Status", width: 110 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <strong>
          <Button
            onClick={() => handleApprove(params.row.id)}
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
          >
            Approve
          </Button>
          <Button
            onClick={() => handleDeny(params.row.id)}
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 16 }}
          >
            Deny
          </Button>
        </strong>
      ),
    },
  ];

  // Handlers for Approve/Deny actions
  const handleApprove = (id) => {
    console.log("Approve", id);
    // Implement the logic to approve the request
  };

  const handleDeny = (id) => {
    console.log("Deny", id);
    // Implement the logic to deny the request
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Header title="PTO Approvals" />{" "}
      {/* Assuming a similar header component */}
      <Typography variant="h4" gutterBottom>
        PTO Requests
      </Typography>
      <DataGrid
        rows={ptoRequests}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
};

export default ApprovalsPage;
