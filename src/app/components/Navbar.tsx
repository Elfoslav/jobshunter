'use client'

import { Container, Navbar, Nav } from 'react-bootstrap'
import { PersonFill } from 'react-bootstrap-icons'
import { usePathname } from 'next/navigation'
import './Navbar.scss'

export default function AppNavbar() {
  const pathname = usePathname()

  const getActiveKey = () => {
    return pathname.includes('job') ? '/jobs' : '/'
  }

  return (
    <Container>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={getActiveKey()} className="me-auto">
            <Nav.Item className="ms-2">
              <Nav.Link href="/jobs">Jobs</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto"> {/* Use ml-auto class to align items to the right */}
            <Nav.Item>
              <Nav.Link href="/profile" className="d-flex align-items-center gap-1">
                <PersonFill size={20} /> Profile
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}