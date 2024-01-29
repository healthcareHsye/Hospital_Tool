import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { navItems, dropdownItems } from "./NavItems";
import Dropdown from "./Dropdown";
import SettingsPopup from './SettingsPopup';  // Import your SettingsPopup component
import UserRegistration from './UserRegistration'; // Adjust the path as necessary



const getDropdownItems = (title) => {
    return dropdownItems[title] || [];
};

function Navbar() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);  // State to control the SettingsPopup
    const [registrationOpen, setRegistrationOpen] = useState(false);
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

    const handleOpenSettings = () => {
        setSettingsOpen(true);
    };

    const handleOpenRegistration = () => {
        setRegistrationOpen(true);
    };

    const handleCloseSettings = () => {
        setSettingsOpen(false);
    };

    const handleSaveSettings = (newSettings) => {
        setSettings(newSettings);
        handleCloseSettings();
    };

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
                    {/* <li className="nav-item">
                        <button onClick={handleOpenSettings}>User Settings</button>
                    </li> */}
                    <li className="nav-item">
                        <button onClick={handleOpenRegistration}>User Registration</button>
                    </li>
                </ul>
            </nav>
            <SettingsPopup style={{ background: '#015EA5'}}
                           isOpen={settingsOpen}
                           onClose={handleCloseSettings}
                           onSave={handleSaveSettings}  // This function is called when the settings are saved
            />


            {/* User Registration Popup */}
            {/*{registrationOpen && (*/}
            {/*    <div className="user-registration-popup">*/}
            {/*        <div className="popup-content">*/}
            {/*            <button className="close-button" onClick={() => setRegistrationOpen(false)}>×</button>*/}
            {/*            <UserRegistration onClose={() => setRegistrationOpen(false)} />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </>
    );
}

export default Navbar;
