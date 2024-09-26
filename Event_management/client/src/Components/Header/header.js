import React, { useEffect } from "react";
import styles from "./header.module.css"; // updated import
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh,faList } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  useEffect(() => {
    const mobileNavToggleBtn = document.querySelector(
      `.${styles.mobileNavToggle}`
    );
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
      <i className={`bi bi-list ${styles.mobileNavToggle}`}></i>

      <aside id="sidebar" className={styles.sidebar}>
        <NavLink to="/" className={styles.logo}>
          <h2 className={styles.sitename}>Event Management</h2>
        </NavLink>

        <nav id="navmenu" className={styles.navmenu}>
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
              <FontAwesomeIcon icon={faList} /> Add Event
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Header;
