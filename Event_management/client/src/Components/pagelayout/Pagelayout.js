// src/components/PageLayout.js
import React from 'react';
import { Box } from '@mui/material';

const PageLayout = ({ children }) => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 5 }, // Adjust padding for different devices
        ml: { xs: 0, md: 30 }, // Add margin for desktop (for sidebar)
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
      }}
    >
      {children}
    </Box>
  );
};

export default PageLayout;
