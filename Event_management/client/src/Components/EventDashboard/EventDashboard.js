import React from 'react';
import styled from 'styled-components';
import EventCard from '../Eventcard/Eventcard';
import eventsData from '../Dummydata/Dummydata';

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
  const upcomingEvents = eventsData.filter(event => event.status === 'Upcoming');
  const pastEvents = eventsData.filter(event => event.status === 'Past');

  return (
    <DashboardContainer>
      <Section>
        <Header>Upcoming Events</Header>
        {upcomingEvents.map((event, index) => (
          <EventCard key={event.id} event={event} index={index + 1} />
        ))}
      </Section>
      <Section>
        <Header>Past Events</Header>
        {pastEvents.map((event, index) => (
          <EventCard key={event.id} event={event} index={index + 1} />
        ))}
      </Section>
    </DashboardContainer>
  );
};

export default EventDashboard;
