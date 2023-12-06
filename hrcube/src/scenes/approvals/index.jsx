import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import DbService from "../../DbService";

const ApprovalsPage = () => {
  const [ptoRequests, setPtoRequests] = useState([]);

  useEffect(() => {
    const fetchPtoRequests = async () => {
      try {
        const response = await DbService.getTimeoffForManager();
        setPtoRequests(response.data);
      } catch (error) {
        console.error("Error fetching PTO requests:", error);
      }
    };

    fetchPtoRequests();
  }, []);

  const getStatusLabel = (approvalCode) => {
    switch (approvalCode) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Denied";
      default:
        return "Unknown";
    }
  };

  const columns = [
    { field: "emp_no", headerName: "Employee Number", width: 130 },
    { field: "name", headerName: "Employee Name", width: 150 },
    { field: "start_date", headerName: "Start Date", width: 130 },
    { field: "end_date", headerName: "End Date", width: 130 },
    { field: "user_comments", headerName: "Comments", width: 200 },
    {
      field: "approval",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => getStatusLabel(params.row.approval),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleApprove(params.row.id)}
            variant="contained"
            color="primary"
            size="small"
          >
            Approve
          </Button>
          <Button
            onClick={() => handleDeny(params.row.id)}
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 8 }}
          >
            Deny
          </Button>
        </>
      ),
    },
  ];

  const handleApprove = async (id) => {
    const timeoffRequest = { timeoffId: id, status: 1 };
    await DbService.approveTimeoff(timeoffRequest);
    updateRequestStatus(id, 1);
  };

  const handleDeny = async (id) => {
    const timeoffRequest = { timeoffId: id, status: 2 };
    await DbService.approveTimeoff(timeoffRequest);
    updateRequestStatus(id, 2);
  };

  const updateRequestStatus = (id, approvalCode) => {
    setPtoRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, approval: approvalCode } : request
      )
    );
  };

  return (
    <>
      <Header />
      <Typography variant="h4" gutterBottom>
        PTO Requests
      </Typography>
      <DataGrid
        rows={ptoRequests}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        hideFooterSelectedRowCount
      />
    </>
  );
};

export default ApprovalsPage;
