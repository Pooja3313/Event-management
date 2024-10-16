import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventCard from '../Eventcard/Eventcard';
import { useAuth } from "../Store/UseContext";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-left: 250px; /* Make room for the sidebar */
  margin-bottom: 60px; /* Make room for the footer */
  
  @media (max-width: 768px) {
    margin-left: 0; /* On smaller screens, remove the margin */
    margin-bottom: 60px; /* Ensure footer spacing on smaller screens */
  }
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Header = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const EventDashboard = () => {
  const { storerEvent, EventFROMLSGet} = useAuth();
  const [events, setEvents] = useState([]); // State to hold events from localStorage

  useEffect(() => {
    // Retrieve events from localStorage
    const storedEvents = EventFROMLSGet();
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }); 

  // Filter upcoming and past events based on their status
  const upcomingEvents = events.filter(event => event.status === 'Upcoming');
  const pastEvents = events.filter(event => event.status === 'Past');

  return (
    <DashboardContainer>
      {/* Upcoming Events Section */}
      <Section>
        <Header>Upcoming Events</Header>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index + 1} />
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </Section>

      {/* Past Events Section */}
      <Section>
        <Header>Past Events</Header>
        {pastEvents.length > 0 ? (
          pastEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index + 1} />
          ))
        ) : (
          <p>No past events.</p>
        )}
      </Section>
    </DashboardContainer>
  );
};

export default EventDashboard;
