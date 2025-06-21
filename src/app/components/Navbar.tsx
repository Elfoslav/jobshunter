'use client';

import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { PersonFill, BuildingsFill } from 'react-bootstrap-icons';
import { usePathname } from 'next/navigation';
import './Navbar.scss';

export default function AppNavbar() {
  const pathname = usePathname();

  const getActiveKey = () => {
    return pathname.includes('job') ? '/jobs' : '/';
  };

  return (
    <Navbar expand="lg" className="bg-light">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className="d-flex d-lg-none justify-content-end">
          <Button className="mt-2 mb-3" href="/jobs/add">
            Post a job
          </Button>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={getActiveKey()} className="me-auto">
            <Nav.Item className="ms-2">
              <Nav.Link href="/jobs">Jobs</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            {/* Use ml-auto class to align items to the right */}
            <Nav.Item className="d-flex">
              <Nav.Link
                href="/company-profile"
                className="d-flex align-items-center gap-1"
              >
                <BuildingsFill size={20} /> Company Profile
              </Nav.Link>
              <Nav.Link
                href="/profile"
                className="d-flex align-items-center gap-1"
              >
                <PersonFill size={20} /> Applicant Profile
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
