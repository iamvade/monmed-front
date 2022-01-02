import { useContext } from "react"
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap"
import { UserContext } from "./miscs/UserContextProvider"

const Header = () => {
  const { user } = useContext(UserContext)
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <NavbarBrand href="/"><img style={{ height: '40px' }} src="/logo.png" /></NavbarBrand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#">About us</Nav.Link>
            <Nav.Link href="#">Service</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
            <Nav.Link href="#">Hospital</Nav.Link>
            {user ? <Nav.Link href="/logout">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header