import React from 'react';
import { BsJustify, BsSearch, BsFillBellFill, BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
function Header({  OpenSidebar ,user}) {
  const rolesLabel={
    1 : "enseigenant",
    2 : "administrateur",
    3 : "super administrateur"
  }
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
        <p className='welcome-message'>Welcome, {user.nom} {user.prenom}! <span className="user-role">{rolesLabel[user.role]}</span></p>
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon bell-icon' />
        <Link to="/profile">
            <BsPersonCircle className='icon person-icon' />
        </Link>
      </div>
    </header>
  );
}
export default Header;