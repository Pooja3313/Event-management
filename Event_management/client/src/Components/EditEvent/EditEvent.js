import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import eventsData from '../Dummydata/Dummydata'; // Import your dummy data
import { toast } from 'react-toastify';

// Styled Components (Reused from AddEvent)
const FormContainer = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  margin-bottom: 200px;
  padding: 40px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  
`;

const InputContainer = styled.div`
  margin-bottom: 20px;

  label {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    display: block;
    color: #333;
  }

  input, textarea, select {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #007BFF;
      outline: none;
    }
  }

  textarea {
    height: 100px;
    resize: vertical;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007BFF;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find event to edit from dummy data
  const eventToEdit = eventsData.find(event => event.id === parseInt(id));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    status: 'Upcoming'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title,
        description: eventToEdit.description,
        date: eventToEdit.date,
        time: eventToEdit.time,
        location: eventToEdit.location,
        status: eventToEdit.status,
      });
    }
  }, [eventToEdit]);

  // Regex patterns for validation
  const titleRegex = /^[a-zA-Z0-9\s]{5,100}$/; 
  const descriptionRegex = /^.{10,500}$/; 
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const locationRegex = /^.{5,100}$/;
  const statusRegex = /^(Upcoming|Past)$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!titleRegex.test(formData.title)) {
      newErrors.title = 'Title should be 5-100 alphanumeric characters.';
    }

    if (!descriptionRegex.test(formData.description)) {
      newErrors.description = 'Description should be between 10-500 characters.';
    }

    if (!dateRegex.test(formData.date)) {
      newErrors.date = 'Please enter a valid date in yyyy-mm-dd format.';
    }

    if (!timeRegex.test(formData.time)) {
      newErrors.time = 'Please enter a valid time in HH:mm format.';
    }

    if (!locationRegex.test(formData.location)) {
      newErrors.location = 'Location should be 5-100 characters long.';
    }

    if (!statusRegex.test(formData.status)) {
      newErrors.status = 'Status must be either "Upcoming" or "Past".';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Updated Event Data:', formData);

      // Show success toast message
      toast.success('Event updated successfully!');

      // Redirect to event list after successful update
      navigate('/eventlist');
    } else {
      toast.error('Please fill out all fields correctly before submitting.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Edit Event</Title>

      <InputContainer>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <Error>{errors.title}</Error>}
      </InputContainer>

      <InputContainer>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <Error>{errors.description}</Error>}
      </InputContainer>

      <InputContainer>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <Error>{errors.date}</Error>}
      </InputContainer>

      <InputContainer>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        {errors.time && <Error>{errors.time}</Error>}
      </InputContainer>

      <InputContainer>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <Error>{errors.location}</Error>}
      </InputContainer>

      <InputContainer>
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Past">Past</option>
        </select>
        {errors.status && <Error>{errors.status}</Error>}
      </InputContainer>

      <Button type="submit">Update Event</Button>
    </FormContainer>
  );
};

export default EditEvent;
