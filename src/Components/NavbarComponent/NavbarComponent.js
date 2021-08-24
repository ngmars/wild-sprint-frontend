import React, { useEffect } from 'react';
import * as actions from '../../store/Actions/Index';
import {useSelector,useDispatch} from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './NavbarComponent.css';

const NavbarComponent = (props) =>
{
  let name = props.name;  
  let role = props.role;
  let item = props.item;
    const dispatch = useDispatch()
    let img = useSelector(state=>state.profile.events.photo)

    useEffect(()=>{
    
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        dispatch(actions.fetchProfile(token,userId))
    
    },[])

    let imageUrl= 'http://localhost:3001/'+img

    return (
      <Navbar collapseOnSelect expand="lg" bg="light">
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
                <Nav.Link className="navlink" href="/events" active={item==="events"}>Events</Nav.Link>
                <Nav.Link className="navlink" href="/mybills" active={item==="bills"}>Bills</Nav.Link>
                {role==='organiser'?<Nav.Link className="navlink" href="/fund" active={item==="fundraiser"}>Fundraiser</Nav.Link>:null}
                <Nav.Link className="navlink" href="/gallery" active={item==="gallery"}>Gallery</Nav.Link>                
              </Nav> 

              <Nav className="me-auto">
                <NavDropdown 
                title={
                <img 
                src={imageUrl}
                height="40"                
                alt="Profile picture"
                />} >
                  <NavDropdown.ItemText classname="navdropdown"> <strong><u>{name}</u></strong> </NavDropdown.ItemText>
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

export default NavbarComponent;