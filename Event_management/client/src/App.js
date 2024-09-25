import { Route, Routes } from 'react-router-dom';
import React, { useReducer } from 'react';
import './App.css';
import EventList from './Components/EventList/EventList';
import EventDashboard from './Components/EventDashboard/EventDashboard';
import Header from './Components/Header/header';
import Footer from './Components/Footer/Footer';
import EventCard from './Components/Eventcard/Eventcard';
import EventDetails from './Components/EventDetail/EventDetail';
import AddEvent from './Components/AddEvent/Addevent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditEvent from './Components/EditEvent/EditEvent';
import { eventReducer, initialState } from './Components/reducer/Reducer';

function App() {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  return (
  <>
  <Header/>
  <Routes>
    <Route path='/eventlist' element={<EventList state={state} dispatch={dispatch}/>}/>
    <Route path='/eventdashboard' element={<EventDashboard state={state}/>} />
    <Route path='/eventcard' element={<EventCard state={state}/>} />
    <Route path='/eventdetail/:id' element={<EventDetails state={state}/>} />
    <Route path='/addevent' element={<AddEvent dispatch={dispatch} />} />
    <Route path='/editevent/:id' element={<EditEvent state={state} dispatch={dispatch}/>} />
  </Routes>
  <Footer/>

  <ToastContainer 
        position="top-right" 
        autoClose={3000}  // Toast disappears after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
  </>
  );
}

export default App;
