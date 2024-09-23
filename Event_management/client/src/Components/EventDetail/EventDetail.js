import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import eventsData from '../Dummydata/Dummydata'; // Import your dummy data

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate(); // For navigation
  const event = eventsData.find(e => e.id === parseInt(id)); // Find the event based on ID

  if (!event) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
        Event not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 }, // Adjust padding for different devices
        ml: { xs: 0, md: 30 }, // Add margin for desktop (for sidebar)
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
        mb: { xs: 10, md: 15 },
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 4, md: 5 }, // Adjust padding for different screen sizes
          width: { xs: '100%', sm: '90%', md: '70%' }, // Width changes based on the viewport
          maxWidth: '900px', // Max width for larger screens
          backgroundColor: '#fff',
          boxShadow: 2,
          borderRadius: 2,
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Event Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center',
            fontSize: { xs: '1.8rem', sm: '2rem', md: '2.4rem' }, // Responsive font size
          }}
        >
          {event.title}
        </Typography>

        {/* Event Date */}
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Responsive font size
          }}
        >
          <strong>Date:</strong> {event.date}
        </Typography>

        {/* Event Time */}
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Responsive font size
          }}
        >
          <strong>Time:</strong> {event.time}
        </Typography>

        {/* Event Location */}
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Responsive font size
          }}
        >
          <strong>Location:</strong> {event.location}
        </Typography>

        {/* Event Description */}
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Responsive font size
            lineHeight: 1.5,
          }}
        >
          <strong>Description:</strong> {event.description}
        </Typography>

        {/* Event Status */}
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Responsive font size
            color: event.status === 'Upcoming' ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          <strong>Status:</strong> {event.status}
        </Typography>
      </Box>

      {/* Button to navigate back to the Event List */}
      <Button
        variant="contained"
        onClick={() => navigate('/eventlist')}
        sx={{
          mt: 3,
          py: 1,
          px: 4,
          fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, // Responsive button font size
          fontWeight: 'bold',
          backgroundColor: '#1976d2',
          '&:hover': { backgroundColor: '#115293' },
        }}
      >
        Back to Event List
      </Button>
    </Box>
  );
};

export default EventDetails;
