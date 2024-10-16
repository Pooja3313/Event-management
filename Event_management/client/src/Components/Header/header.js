import React, { useEffect,useState } from "react";
import "./header.css";
import { NavLink,useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTh,
  faList,
  faPlus,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify"; 
import { useAuth } from "../Store/UseContext";

const Header = () => {
  const {token ,usertype} = useAuth();

  useEffect(() => {
    // Mobile Nav Toggle functionality
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    const mobileNavToggle = () => {
      document.querySelector("body").classList.toggle("mobile-nav-active");
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    };

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener("click", mobileNavToggle);
    }

    const navLinks = document.querySelectorAll("#navmenu a");
    navLinks.forEach((navmenu) => {
      navmenu.addEventListener("click", () => {
        if (document.querySelector(".mobile-nav-active")) {
          mobileNavToggle();
        }
      });
    });

    return () => {
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.removeEventListener("click", mobileNavToggle);
      }
      navLinks.forEach((navmenu) => {
        navmenu.removeEventListener("click", () => {
          if (document.querySelector(".mobile-nav-active")) {
            mobileNavToggle();
          }
        });
      });
    };
  }, []);
  

  return (
    <>
      {/* Mobile nav toggle button */}
      <i className="bi bi-list mobile-nav-toggle"></i>

      <aside id="sidebar" className="sidebar d-flex flex-column sticky-top">
        <NavLink to="/" className="logo d-flex align-items-center mb-4">
          <h2 className="sitename">Event Management</h2>
        </NavLink>

        <nav id="navmenu" className="navmenu flex-grow-1">
          <ul>
          {usertype === "admin" ? (
              <>
                <li>
                  <NavLink to="/eventlist">
                    <FontAwesomeIcon icon={faList} /> Event List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/addevent">
                    <FontAwesomeIcon icon={faPlus} /> Add Event
                  </NavLink>
                </li>
              
              </>
            ) : usertype === "user" ? (
              <li>
                <NavLink to="/eventdashboard">
                  <FontAwesomeIcon icon={faTh} /> Event Dashboard
                </NavLink>
              </li>
            ) : (
              // Display this when usertype is empty (unknown)
              <li>
                <NavLink to="/eventdashboard">
                  <FontAwesomeIcon icon={faTh} />Event Dashboard
                </NavLink>
              </li>
            )}
           
            {token? (
              <> 
              <li>
              <NavLink to="/logout">
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </NavLink>
            </li>
           
            </>
            ):(
              <>
              <li>
              <NavLink to="/register">
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </NavLink>
            </li>
              <li>
              <NavLink to="/login">
                <FontAwesomeIcon icon={faSignInAlt} />
                Login
              </NavLink>
            </li>
            </>
            )
            };
           
          </ul>
        </nav>

        {/* Example for adding a 'Create Event' button if needed */}
        {/* <NavLink className="btn-getstarted mt-auto" to="#">
          <i className="bi bi-plus-lg"></i> Create Event
        </NavLink> */}
      </aside>
    </>
  );
};

export default Header;
