import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EventItem = ({ event }) => {
  const [open, setOpen] = useState(false);
  const now = new Date();
  const isUpcoming = new Date(event.date) > now;
  const status = isUpcoming ? "Upcoming" : "Past";

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/eventdetail/${event.id}`); // Navigate to the EventDetails page with the event ID
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          mb: 2,
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
        }}
      >
        {/* Clickable event name to open the modal */}
        <Typography
          variant="h6"
          onClick={handleClickOpen}
          sx={{ cursor: "pointer", color: "black", fontWeight: "bold" }}
        >
          {event.title}
        </Typography>
      </Box>

      {/* Dialog for showing event details */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            p: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: "16px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          {event.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            <Typography sx={{ mb: 2, fontSize: "1.1rem" }}>
              Date: {event.date}
            </Typography>
            <Typography sx={{ mb: 2, fontSize: "1.1rem" }}>
              Location: {event.location}
            </Typography>
            <Typography
              sx={{
                mb: 2,
                color: isUpcoming ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              Status: {status}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleNavigate}
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            Details
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventItem;
