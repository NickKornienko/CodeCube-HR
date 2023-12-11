import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import AuthService from "../../AuthService.js";
import { tokens } from "../../theme";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
    try {
      await AuthService.changePassword(oldPassword, newPassword);
      alert("Password successfully changed!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password.");
    }
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: "4px",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Divider sx={{ borderColor: "divider", mb: 3 }} />
      <Typography variant="h6" gutterBottom sx={{ color: "black", mb: 2 }}>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Old Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          InputLabelProps={{
            style: { color: "black" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
              "& fieldset": { borderColor: "primary.dark" },
            },
            mb: 2,
          }}
        />
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputLabelProps={{
            style: { color: "black" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
              "& fieldset": { borderColor: "primary.dark" },
            },
            mb: 2,
          }}
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          InputLabelProps={{
            style: { color: "black" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
              "& fieldset": { borderColor: "primary.dark" },
            },
            mb: 2,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
            borderRadius: "20px",
            height: "48px",
          }}
        >
          Change Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
