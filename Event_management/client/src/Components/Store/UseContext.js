import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  // const [userID, setUserID] = useState("");
  const [usertype, setUsertype] = useState("");

  useEffect(() => {
    const storedToken = TokenFROMLSGet;
    const storedIsUserType = UserTypeFROMLSGet();
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedIsUserType) {
      setUsertype(storedIsUserType); // Set the isAdmin if found
      console.log("store usertype", usertype);
    }
  }, );

  // const storeregisterUser = (userData) => {
  //   localStorage.setItem("registeredUser", JSON.stringify(userData));
  // }
  const storeregisterUser = (userData) => {
    // Get existing registered users from localStorage
    let existingUsers = JSON.parse(localStorage.getItem("registeredUser")) || [];
    console.log(existingUsers);
  
    // Check if existingUsers is not an array (in case of old single object storage)
    // if (!Array.isArray(existingUsers)) {
    //   existingUsers = [existingUsers];
    // }
  
    // Add the new user to the array
    existingUsers.push(userData);
  
    // Save the updated array back to localStorage double code ma badhu hashe key and value both
    localStorage.setItem("registeredUser", JSON.stringify(existingUsers));
  };
  
  const storerEvent = (EventData) => {
    localStorage.setItem("events", JSON.stringify(EventData));
  }
  const EventFROMLSGet = () => {
    return localStorage.getItem("events");
  };
  // const EventFROMLSDelete = (EventData) => {
  //   localStorage.removeItem("events", JSON.stringify(EventData));
  // };
  // const EventFROMLSDelete = (EventData) => {
  //   localStorage.removeItem("events");
  // };
 

// const getRegisteredUser = () => {
  //   const storedUser = localStorage.getItem("registeredUser");
  //   return storedUser ? JSON.parse(storedUser) : null;
  // };
  const getRegisteredUser = () => {
    const storedUsers =  JSON.parse(localStorage.getItem("registeredUser")) || [];
    console.log(storedUsers);
  
    // Ensure we return an array
    // if (!storedUsers) {
    //   return [];
    // }
  
    // const parsedUsers = JSON.parse(storedUsers);
    return Array.isArray(storedUsers) ? storedUsers : [storedUsers];
  };
  
  const storeloginUser = (serverToken) => {
  //  localStorage.removeItem("registeredUser");
   localStorage.setItem("token", serverToken);
    setToken(serverToken);

  };

  const TokenFROMLSGet = () => {
    return localStorage.getItem("token");
  };
 

  const StoreUserTypeINLS = (serverUsertype) => {
    setUsertype(serverUsertype);
    localStorage.setItem("usertype", serverUsertype);
    
  };

  const UserTypeFROMLSGet = () => {
    return localStorage.getItem("usertype");
  };


  const logout = () => {
    setToken("");
    setUsertype("");
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    // localStorage.removeItem("events");
   
  };

  return (
    <AuthContext.Provider
      value={{
      
        // UserTypeFROMLSGet,
        storeregisterUser,
        getRegisteredUser,
        storeloginUser,
        TokenFROMLSGet,
        token,
        logout,
        usertype,
        StoreUserTypeINLS,
        storerEvent,
        EventFROMLSGet,
        // EventFROMLSDelete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
