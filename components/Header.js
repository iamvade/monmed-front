import axios from "axios"
import { parseCookies } from "nookies"
import { useEffect } from "react"
import { Container, NavbarBrand, Navbar, Nav } from "react-bootstrap"
import { getStrapiURL } from "../utils/api"

const Header = ({ user }) => {
  const { jwt } = parseCookies()
  useEffect(() => {
    const f = async () => {
      if (jwt) {
        const { data: user } = await axios.get(getStrapiURL('/users/me'), { headers: { Authentication: `Bearer ${jwt}` } })
        setUserInfo
      }
    }
  }, [])
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

// export async function getServerSideProps(ctx) {
//   try {
//     console.log('cookies >>> ', cookies)
//     if (jwt) {
//       const { data: user } = await axios.get(getStrapiURL('/users/me'), { headers: { Authentication: `Bearer ${jwt}` } })
//       console.log(user)
//       return { props: { user } }
//     } else {
//       return { props: {} }
//     }
//   } catch (err) {
//     console.log(err)
//     return { props: {} }
//   }
// }
