import React, { useState } from 'react';
import { BsBarChartLine, BsGrid1X2Fill, BsEmojiSmile, BsPersonCircle, BsFillGearFill, BsBoxArrowRight, BsPerson } from 'react-icons/bs';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function SideBare({ openSidebarToggle, OpenSidebar, user }) {
  const location = useLocation();
  const [logOut, setLogOut] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const styleCurrentLink = {
    backgroundColor: "#fff",
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
  };

  let sidebarItems = [
    { to: "/dashboard", icone: <BsGrid1X2Fill className='icon' />, label: "Dashboard" },
    { to: "/emotionDetection", icone: <BsEmojiSmile className='icon' />, label: "Emotions Detections" },
    { to: "/profile", icone: <BsPersonCircle className='icon' />, label: "Profile" },
  ];

  if (user.role == 3)
    sidebarItems.push({ to: "/gestionUser", icone: <BsPerson className='icon' />, label: "gestions utilisateurs" });

  if (logOut) {
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  }

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsBarChartLine className='icon_header' /> Course Performance
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className='sidebar-list-item'
            style={location.pathname === item.to ? styleCurrentLink : {}}>
            <Link to={item.to}>
              {item.icone} {item.label}
            </Link>
          </li>
        ))}
        <li className='sidebar-list-item'>
          <Link className='btn btn-link' onClick={() => setShowModal(true)} style={{ textDecoration: 'none', padding: 0 }}>
            <BsBoxArrowRight className='icon' /> Sign Out
          </Link>
        </li>
      </ul>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="text-center mb-4">Confirmation de déconnexion</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">Êtes-vous sûr de vouloir vous déconnecter ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={() => { setLogOut(true); setShowModal(false); }}>
            Déconnecter
          </Button>
        </Modal.Footer>
      </Modal>

    </aside>
  );
}

export default SideBare;
