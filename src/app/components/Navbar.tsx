'use client';

import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { PersonFill, BuildingsFill } from 'react-bootstrap-icons';
import { usePathname, useRouter } from 'next/navigation';
import './Navbar.scss';
import { useUser } from '../context/UserContext';
import { isApplicantUser, isCompanyUser } from '@/lib/utils/user';
import { ExistingCompany } from '@/models/Company';
import Image from 'next/image';
import CanAccess from './CanAccess';
import { UserType } from '@/models/User';
import LoginRegisterButtons from './LoginRegisterButtons';

export default function AppNavbar() {
  const pathname = usePathname();
  const { user, isLoading, logout } = useUser();
  const router = useRouter();

  const getAccountName = () => {
    if (isApplicantUser(user)) return user.name;
    if (isCompanyUser(user)) return user.companyData?.name;
    return 'Account';
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Navbar expand="lg" className="bg-light mb-3">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <CanAccess
          user={user}
          requiredRole={[UserType.Admin, UserType.Company]}
          fallback={
            !user && (
              <div className="d-flex d-lg-none justify-content-end">
                <LoginRegisterButtons />
              </div>
            )
          }
        >
          <div className="d-flex d-lg-none justify-content-end">
            <Button className="mt-2 mb-3" href="/jobs/add">
              Post a job
            </Button>
          </div>
        </CanAccess>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={pathname} className="me-auto">
            <Navbar.Brand href="/" className="pe-0">
              <Image
                src="/images/jobs-hunt-logo-small.png"
                width="50"
                height="32"
                className="d-inline-block align-top ms-lg-2"
                alt="JobsHunt logo"
              />
            </Navbar.Brand>
            <Nav.Item>
              <Nav.Link href="/jobs">Jobs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/companies">Companies</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/applicants">Applicants</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            {/* Use ml-auto class to align items to the right */}

            {isLoading ? (
              <Nav.Item>
                <Nav.Link
                  className="d-flex align-items-center gap-1"
                  style={{ opacity: 0.5, pointerEvents: 'none' }}
                >
                  <PersonFill size={20} />
                  Loading...
                </Nav.Link>
              </Nav.Item>
            ) : user ? (
              <NavDropdown
                title={
                  <span className="d-inline-flex align-items-center gap-1">
                    <PersonFill size={20} />
                    {getAccountName()}
                  </span>
                }
                id="user-nav-dropdown"
                align="end"
              >
                {isCompanyUser(user) && user.companyData ? (
                  <NavDropdown.Item
                    href={`/companies/${(user.companyData as ExistingCompany).id}`}
                  >
                    <BuildingsFill size={16} className="me-2" />
                    Company Profile
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/profile">
                    <PersonFill size={16} className="me-2" />
                    Profile
                  </NavDropdown.Item>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Item className="d-none d-lg-block">
                <LoginRegisterButtons />
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
