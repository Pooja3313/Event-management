import { Route, Routes } from 'react-router-dom';
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

function App() {
  return (
  <>
  
  <Header/>
  <Routes>
    <Route path='/eventlist' element={<EventList/>} />
    <Route path='/eventdashboard' element={<EventDashboard/>} />
    <Route path='/eventcard' element={<EventCard/>} />
    <Route path='/eventdetail/:id' element={<EventDetails/>} />
    <Route path='/addevent' element={<AddEvent/>} />
    <Route path='/editevent/:id' element={<EditEvent/>} />
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
