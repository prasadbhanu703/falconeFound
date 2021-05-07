import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropDown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Select
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick>DonLon</DropdownItem>
        <DropdownItem>Enchai</DropdownItem>
        <DropdownItem>Jebing</DropdownItem>
        <DropdownItem>Sapir</DropdownItem>
        <DropdownItem>Lerbin</DropdownItem>
        <DropdownItem>Pingasore</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropDown;