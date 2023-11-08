import React, { useState } from "react";
import { aboutUsDropdown } from "./NavItems";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown({ items }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      <ul
        className={dropdownOpen ? "submenu clicked" : "submenu"}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {items.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={item.cName}
                onClick={() => setDropdownOpen(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
