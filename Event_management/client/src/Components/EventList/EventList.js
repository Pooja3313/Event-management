import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import EventItem from "../EventItem/EventItem";
import { toast } from "react-toastify";
import { useAuth } from "../Store/UseContext";




// Utility to filter events based on the selected filter
const getFilteredEvents = (events, filter) => {
  if (!Array.isArray(events)) {
    return []; // Ensure `events` is always an array
  }

  const now = new Date();
  if (filter === "Upcoming") {
    return events.filter(
      (event) => new Date(event.date) > now 
    );
  } else if (filter === "Past") {
    return events.filter(
      (event) => new Date(event.date) < now
    );
  }
  return events; // Exclude deleted events
};

const EventList = () => {
  const {EventFROMLSDelete, EventFROMLSGet} = useAuth();
  const [eventList, setEventList] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);

  useEffect(() => {
    let storedEvents = EventFROMLSGet();
    console.log("Raw data from localStorage:", storedEvents); // Debugging
  
    try {
      storedEvents = JSON.parse(storedEvents);
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
      storedEvents = [];
    }
  
    // If it's a single object, convert it to an array
    if (!Array.isArray(storedEvents)) {
      storedEvents = [storedEvents];
    }
    // Filter out any invalid events (e.g., null or undefined)
    storedEvents = storedEvents.filter(event => event !== null && event !== undefined);
  
    console.log("Parsed events array:", storedEvents); // Debugging
    setEventList(storedEvents); // Update state
  }, [EventFROMLSGet]);
  

  const filteredEvents = getFilteredEvents(eventList, filter);

  const handleEdit = (eventId) => {
    navigate(`/editevent/${eventId}`);
  };

  const handleDeleteOpen = (eventId) => {
    setEventIdToDelete(eventId);
    setOpenDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDialog(false);
    setEventIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (eventIdToDelete !== null) {
      // Step 1: Retrieve the event list from localStorage
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
      console.log("Stored events before deletion:", storedEvents);
      console.log("Event ID to delete:", eventIdToDelete);
  
      // Step 2: Filter out the event with the specific ID
      const updatedEvents = storedEvents.filter(event => event.id !== eventIdToDelete);
  
      // Step 3: Update localStorage with the filtered events
      localStorage.setItem("events", JSON.stringify(updatedEvents));
  
      // Step 4: Update the event list in state
      setEventList(updatedEvents);
      console.log("Updated events after deletion:", updatedEvents);
  
      // Show success message
      toast.success("Event deleted successfully");
    }
  
    handleDeleteClose();
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
