import React, { useState } from 'react';
import { Box, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import EventItem from '../EventItem/EventItem';
import eventsData from '../Dummydata/Dummydata';

const getFilteredEvents = (filter) => {
  const now = new Date();
  if (filter === 'Upcoming') {
    return eventsData.filter(event => new Date(event.date) > now);
  } else if (filter === 'Past') {
    return eventsData.filter(event => new Date(event.date) < now);
  }
  return eventsData;
};

const EventList = () => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const filteredEvents = getFilteredEvents(filter);

  const handleEdit = (eventId) => {
    navigate(`/editevent/${eventId}`); // Navigate to the edit event page with the event ID
  };

  return (
    <Box 
      sx={{ 
        p: { xs: 2, md: 4 },
        ml: { xs: 0, md: 30 },
        mb: { xs: 10, md: 15 }
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          mb: { xs: 2, md: 3 },
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        Event List
      </Typography>

      <FormControl 
        sx={{ 
          mb: 3, 
          minWidth: 120, 
          width: { xs: '100%', md: 'auto' }
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
        filteredEvents.map(event => (
          <Box 
            key={event.id} 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              py: 2,
              borderBottom: '1px solid #ccc',
            }}
          >
            {/* Adjusted the width for the EventItem to take more space */}
            <Box sx={{ flex: 1 }}>
              <EventItem event={event} />
            </Box>
            {/* Reduced the space between the event and the button */}
            <Button 
              variant="contained" 
              onClick={() => handleEdit(event.id)} 
              sx={{ ml: 2 }} // Reduced margin between event and button
            >
              Edit Event Details
            </Button>
          </Box>
        ))
      ) : (
        <Typography>No events found.</Typography>
      )}
    </Box>
  );
};

export default EventList;
