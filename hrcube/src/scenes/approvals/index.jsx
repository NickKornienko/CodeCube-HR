import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import DbService from "../../DbService";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const ApprovalsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
    { field: "emp_no", headerName: "Employee Number", width: 130, flex: 1 },
    { field: "name", headerName: "Employee Name", width: 150, flex: 1  },
    { field: "start_date", headerName: "Start Date", width: 130, flex: 1  },
    { field: "end_date", headerName: "End Date", width: 130, flex: 1  },
    { field: "user_comments", headerName: "Comments", width: 200, flex: 1  },
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
    <Box m="20px" >
    <Typography variant="h3" color={colors.primary[500]}>
          PTO Requests
        </Typography>
     <Box mt="20px" height="500px" color={colors.white}>
     <DataGrid
        rows={ptoRequests}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        hideFooterSelectedRowCount
        sx={{
          backgroundColor: colors.white,
          m:"20px",
          border: 'none',
          borderRadius: '15px',
          boxShadow: theme.shadows[2],
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
          },
          // Removes borders from individual cells
    '& .MuiDataGrid-cell': {
      border: 'none',
      padding: '20px 20px 20px 20px', // If you also want to add padding to the cells
    },
   
      

    '& .MuiDataGrid-columnHeader': {
      padding: '10px', // If you also want to add padding to the column headers
    },

    // Removes borders from column headers
    '& .MuiDataGrid-columnHeaders': {
      borderBottom: 'none',
    },

        

          '& .MuiDataGrid-row': {
            backgroundColor: colors.white,
            color: colors.primary[600],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.white,
            color: colors.primary[600],
          },
          '& .MuiDataGrid-footerContainer': {
            color: colors.primary[600], // Replace with any color you want
          },
          // If you want to target specifically the pagination
          '& .MuiTablePagination-root': {
            color: colors.primary[600], // Replace with any color you want
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
        }}
       
      />
      </Box> 
    </Box>
  
    </>
  );
};

export default ApprovalsPage;
