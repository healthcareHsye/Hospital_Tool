import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { navItems, dropdownItems } from "./NavItems";
import Dropdown from "./Dropdown";
import SettingsPopup from './SettingsPopup';  // Import your SettingsPopup component

const getDropdownItems = (title) => {
  return dropdownItems[title] || [];
};

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);  // State to control the SettingsPopup
  const [settings, setSettings] = useState({ graphType: 'Deterministic' });  // Add the settings state
  const navigate = useNavigate();

  const handleMouseEnter = (itemTitle) => {
    setActiveDropdown(itemTitle);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleClickCChart = () => {
    navigate("/c-Chart");
  };

<<<<<<< HEAD
  // const handleOpenSettings = () => {
  //   setSettingsOpen(true);
  // };

  // const handleCloseSettings = () => {
  //   setSettingsOpen(false);
  // };

  // const handleSaveSettings = (newSettings) => {
  //   setSettings(newSettings);
  //   handleCloseSettings();
  // };
=======
  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    handleCloseSettings();
  };
>>>>>>> d276f0ce (Include client-side folder in main repository)

  return (
    <>
      <nav className="navbar">
        <ul className="nav-items" >
          {navItems.map((item) => (
            <li
              key={item.id}
              className={item.cName}
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={item.path}
                onClick={item.title === "Charts" ? handleClickCChart : null}
              >
                {item.title}
              </Link>
              {activeDropdown === item.title && (
                <Dropdown items={getDropdownItems(item.title)} />
              )}
            </li>
          ))}
<<<<<<< HEAD
          {/* <li className="nav-item">
            <button onClick={handleOpenSettings}>User Settings</button>
          </li> */}
        </ul>
      </nav>
      {/* <SettingsPopup style={{ background: '#015EA5'}}
        isOpen={settingsOpen}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}  // This function is called when the settings are saved
      /> */}
=======
          <li className="nav-item">
            <button onClick={handleOpenSettings}>User Settings</button>
          </li>
        </ul>
      </nav>
      <SettingsPopup style={{ background: '#015EA5'}}
        isOpen={settingsOpen}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}  // This function is called when the settings are saved
      />
>>>>>>> d276f0ce (Include client-side folder in main repository)
    </>
  );
}

export default Navbar;
