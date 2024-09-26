import React, { useEffect } from "react";
import  "./header.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList, faPlus } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
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
          <li>
              <NavLink to="/eventdashboard">
              <FontAwesomeIcon icon={faTh} /> Event Dashboard
              </NavLink>
            </li>
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