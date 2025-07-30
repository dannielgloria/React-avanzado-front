import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Header = ({ onSearch }) => {
  const { user, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const value = e.target.elements.search.value
    onSearch?.(value)
  }

  return (
    <Navbar expand="lg" bg="light" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Mi Blog
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/">Posts</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Registro</Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <>
              <Form className="d-flex me-2" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Buscar título..."
                  name="search"
                />
              </Form>
              <Button variant="outline-danger" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
