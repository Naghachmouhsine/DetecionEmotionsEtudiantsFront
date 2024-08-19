import React from 'react';
import { BsJustify, BsSearch, BsFillBellFill, BsPersonCircle } from 'react-icons/bs';
function Header({ openSidebarToggle, OpenSidebar ,user}) {
  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-search'>
        <BsSearch className='search-icon' />
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
      <div className='header-welcome'>
        <p className='welcome-message'>Welcome, {user.nom} {user.prenom}! <span className="user-role">{user.roles}</span></p>
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon bell-icon' />
        <BsPersonCircle className='icon person-icon' />
      </div>
    </header>
  );
}
export default Header;