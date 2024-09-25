import React, { useState, useReducer } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import EventItem from "../EventItem/EventItem";
// import { eventReducer, initialState } from "../reducer/Reducer";
import { toast } from "react-toastify";

const getFilteredEvents = (events, filter) => {
  const now = new Date();
  if (filter === "Upcoming") {
    return events.filter(
      (event) => new Date(event.date) > now && !event.isDeleted
    );
  } else if (filter === "Past") {
    return events.filter(
      (event) => new Date(event.date) < now && !event.isDeleted
    );
  }
  return events.filter((event) => !event.isDeleted); // Exclude deleted events
};

const EventList = ({ state, dispatch }) => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation
  // const [state, dispatch] = useReducer(eventReducer, initialState);
  const [openDialog, setOpenDialog] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);

  const filteredEvents = getFilteredEvents(state.events, filter);

  const handleEdit = (eventId) => {
    navigate(`/editevent/${eventId}`); // Navigate to the edit event page with the event ID
  };

  const handleDeleteOpen = (eventId) => {
    setEventIdToDelete(eventId);
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleDeleteClose = () => {
    setOpenDialog(false); // Close the dialog
    setEventIdToDelete(null); // Reset event ID
  };

  const handleDeleteConfirm = () => {
    if (eventIdToDelete !== null) {
      // Mark the event as deleted instead of removing it
      dispatch({ type: "DELETE_EVENT", payload: eventIdToDelete });
      toast.success("Event deleted successfully");
    }
    handleDeleteClose(); // Close the dialog after confirming deletion
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        ml: { xs: 0, md: 30 },
        mb: { xs: 10, md: 15 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 2, md: 3 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Event List
      </Typography>

      <FormControl
        sx={{
          mb: 3,
          minWidth: 120,
          width: { xs: "100%", md: "auto" },
        }}
      >
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Upcoming">Upcoming</MenuItem>
          <MenuItem value="Past">Past</MenuItem>
        </Select>
      </FormControl>

      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <Box
            key={event.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
              borderBottom: "1px solid #ccc",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <EventItem event={event} />
            </Box>
            <Button
              variant="contained"
              onClick={() => handleEdit(event.id)}
              sx={{ ml: 2 }}
            >
              Edit Event Details
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteOpen(event.id)}
              // Open the confirmation dialog
              sx={{ ml: 2 }}
            >
              Delete Event
            </Button>
          </Box>
        ))
      ) : (
        <Typography>No events found.</Typography>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDeleteClose}
        PaperProps={{
          style: {
            position: "absolute",
            top: "10px",
            margin: "0 auto",
            width: "80%",
          },
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this event as deleted? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventList;
