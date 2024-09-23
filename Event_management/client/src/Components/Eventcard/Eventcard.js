import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const EventId = styled.span`
  font-size: 1em;
  font-weight: bold;
  background-color: #f0f0f0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Title = styled.h2`
  font-size: 1.4em;
  margin: 0;
`;

const Date = styled.p`
  font-size: 0.9em;
  color: #555;
  margin: 5px 0;
`;

// const Description = styled.p`
//   font-size: 0.95em;
//   color: #777;
// `;

const EventCard = ({ event,index }) => {
  if (!event || !event.title) {
    return <CardContainer>No Event Data Available</CardContainer>;
  }

  return (
    <CardContainer>
      <Header>
        <EventId>{index}</EventId>
        <Title>{event.title}</Title>
      </Header>
      <Date>{event.date}</Date>
      {/* <Description>{event.description}</Description> */}
    </CardContainer>
  );
};

export default EventCard;
