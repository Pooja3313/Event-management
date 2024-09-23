import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled Components
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


const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    status: ''
  });
  
  const [errors, setErrors] = useState({});

  // Regex patterns for validation
  const titleRegex = /^[a-zA-Z0-9\s]{5,100}$/; 
  const descriptionRegex = /^.{10,500}$/; 
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const locationRegex = /^.{5,100}$/;
  const statusRegex = /^(Upcoming|Past)$/;

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted', formData);

      // Show success toast message
      toast.success('Event added successfully!');

      // Reset form fields to empty after successful submission
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        status: ''
      });

      // Optionally, clear any error messages
      setErrors({});
    }else{
        toast.error('Please fill out all fields correctly before submitting.');

      }
    };
  

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Add New Event</Title>

      <InputContainer>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        {errors.title && <Error>{errors.title}</Error>}
      </InputContainer>

      <InputContainer>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        {errors.description && <Error>{errors.description}</Error>}
      </InputContainer>

      <InputContainer>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        {errors.date && <Error>{errors.date}</Error>}
      </InputContainer>

      <InputContainer>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
        />
        {errors.time && <Error>{errors.time}</Error>}
      </InputContainer>

      <InputContainer>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
        {errors.location && <Error>{errors.location}</Error>}
      </InputContainer>

      <InputContainer>
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="">Select Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Past">Past</option>
        </select>
        {errors.status && <Error>{errors.status}</Error>}
      </InputContainer>

      <Button type="submit">Add Event</Button>
    </FormContainer>
  );
};

// Styled Components (added above for improved styling)

export default AddEvent;
