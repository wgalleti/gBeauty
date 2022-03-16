import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CustomNavbar = () => {
  const links = [
    { to: "/", title: "Home", type: "main" },
    { to: "/peoples", title: "Peoples", type: "secondary" },
    { to: "/services", title: "Services", type: "secondary" },
    { to: "/products", title: "Products", type: "secondary" },
    {
      to: "/treatmentregister",
      title: "Register Treatment",
      type: "main",
    },
    { to: "/treatments", title: "Treatments", type: "secondary" },
  ];
  return (
    <Navbar
      collapseOnSelect
      bg="primary"
      variant="dark"
      fixed="sticky"
      expand={false}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Brand>GBeauty</Navbar.Brand>
        <Nav className="flex-grow">
          {links &&
            links
              .filter((f) => f.type === "main" || false)
              .map((l) => (
                <LinkContainer to={l.to} key={l.to}>
                  <Nav.Link>{l.title}</Nav.Link>
                </LinkContainer>
              ))}
        </Nav>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Options</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <LinkContainer to="/">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              {links &&
                links
                  .filter((f) => f.type === "secondary" || false)
                  .map((l) => (
                    <LinkContainer to={l.to} key={l.to}>
                      <Nav.Link>{l.title}</Nav.Link>
                    </LinkContainer>
                  ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
