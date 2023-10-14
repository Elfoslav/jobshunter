'use client'

import { Container, Nav } from 'react-bootstrap'
import { usePathname } from 'next/navigation'
import './Navbar.scss'

export default function Navbar() {
  const pathname = usePathname()

  const getActiveKey = () => {
    return pathname.includes('job') ? '/jobs' : '/'
  }

  return (
    <Container>
      <Nav activeKey={getActiveKey()}>
        <Nav.Item>
          <Nav.Link href="/jobs">Jobs</Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  )
}