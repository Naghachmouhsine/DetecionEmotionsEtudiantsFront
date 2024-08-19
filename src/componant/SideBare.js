import React from 'react';
import { BsBarChartLine, BsGrid1X2Fill, BsEmojiSmile, BsPersonCircle, BsFillGearFill, BsBoxArrowRight, BsPerson } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
function SideBare({ openSidebarToggle, OpenSidebar ,user}) {
  const location=useLocation()
  const styleCurrentLink={
                            backgroundColor : "#fff",
                            borderTopLeftRadius : "20px",
                            borderBottomLeftRadius : "20px",
                          }
  let sidebarItems=[
    {to : "/dashboard","icone" :<BsGrid1X2Fill className='icon' />,"label" : "Dashboard"},
    {to : "/emotionDetection","icone" :            <BsEmojiSmile className='icon' />,"label" : " Emotions Detections "},
    {to : "/profile","icone" :   <BsPersonCircle className='icon' /> ,"label" : "Profile"},
  ]

  console.log(user)
  if(user.role==3)
    sidebarItems.push({to : "/gestionUser",icone : <BsPerson  className='icon' />,label : "gestions utilisateurs" })
  

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
        <BsBarChartLine className='icon_header' /> Course Performance 
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
      {sidebarItems.map((item,index)=>(
          <li 
                  key={index}
                  className='sidebar-list-item'  
                  style={location.pathname===item.to ?  styleCurrentLink : {}}>
          <Link to={item.to} >
             {item.icone} {item.label}
          </Link>
        </li>
      ))}
        <li className='sidebar-list-item'>
          <a href="">
            <BsFillGearFill className='icon' /> Setting
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsBoxArrowRight className='icon' /> Sign Out
          </a>
        </li>
      </ul>
    </aside>
  )
}

export default SideBare;
