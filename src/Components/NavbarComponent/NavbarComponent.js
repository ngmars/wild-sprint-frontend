import React, { useEffect } from 'react';
import {withRouter} from "react-router-dom";
import * as actions from '../../store/Actions/Index';
import {useSelector,useDispatch} from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './NavbarComponent.css';

const NavbarComponent = ({location}) =>
{
  let name = localStorage.getItem("name");  
  let role = localStorage.getItem("role");
  const dispatch = useDispatch()
  let img = useSelector(state=>state.profile.events.photo)

  useEffect(()=>{  
      let token = localStorage.getItem('token');
      let userId = localStorage.getItem('userId');
      dispatch(actions.fetchProfile(token,userId))  
  },[])

  let imageUrl= 'http://localhost:3001/'+img

  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg="light">
      <Container>          
          <Navbar.Brand href="/events">
            <img
              src='/logo.png'
              height="50"                
              alt="Wildsprint logo"
              className="align-top"
            /> {' '}              
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="mr-auto">
              <div classNam="link-box">
                
              </div>
              <Nav.Link href="/events" className={location.pathname === '/events'?"nav-links-active":"nav-links" }>Events</Nav.Link>
              <Nav.Link href="/mybills" className={location.pathname === '/mybills'?"nav-links-active":"nav-links" } active={location.pathname === '/mybills'}>Bills</Nav.Link>
              {role==='organiser'?<Nav.Link href="/fund" className={location.pathname === '/fund'?"nav-links-active":"nav-links" } active={location.pathname === '/fund'}>Fundraisers</Nav.Link>:null}
              <Nav.Link href="/gallery" className={location.pathname === '/gallery'?"nav-links-active":"nav-links" } active={location.pathname === '/gallery'}>Gallery</Nav.Link>                
            </Nav> 

            <Nav className="me-auto">
              <NavDropdown
              title={
                  <img 
                    src={imageUrl}
                    height="40"                
                    alt="Profile"
                  />
              } >
                <NavDropdown.ItemText> <strong>{name.toUpperCase()}</strong> </NavDropdown.ItemText>
                <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default withRouter(NavbarComponent);