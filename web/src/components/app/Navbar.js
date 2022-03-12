import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CustomNavbar = () => {
  const links = [
    { to: '/', title: 'Home', },
    { to: '/peoples', title: 'Peoples', },
    { to: '/services', title: 'Services', },
    { to: '/products', title: 'Products', },
    { to: '/treatments', title: 'Treatments', },
  ]
  return (
    <Navbar bg="primary" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#home">Galleti Beauty</Navbar.Brand>
        <Navbar.Toggle/>
        <Nav>
          {
            links &&
            links.map((l) => {
              return (
                <LinkContainer key={l.to} to={l.to}>
                  <Nav.Link className="lead">{l.title}</Nav.Link>
                </LinkContainer>
              )
            })
          }
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            wGalleti
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
