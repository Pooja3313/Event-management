import eventsData from "../Dummydata/Dummydata";

 export const initialState = {
    events: eventsData, // You can initialize with dummy data
  };
  
 export const eventReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_EVENT':
        return {
          ...state,
          events: [...state.events, action.payload],
        };
      case 'EDIT_EVENT':
        return {
          ...state,
          events: state.events.map(event =>
            event.id === action.payload.id ? { ...event, ...action.payload } : event
          ),
        };
      case 'DELETE_EVENT':
        return {
          ...state,
          events: state.events.filter(event => event.id !== action.payload),
        };
      default:
        return state;
    }
  };
  