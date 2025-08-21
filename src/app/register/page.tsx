'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import RegisterForm from './components/RegisterForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import {
  NewApplicantUser,
  BaseUser,
  NewCompanyUser,
  ExistingCompanyUser,
  NewUser,
  ExistingUser,
  UserType,
} from '@/models/User';
import {
  getUserByEmail,
  useCreateUser,
  useUpdateUser,
} from '@/services/users/UsersService';
import { useCreateCompany } from '@/services/companies/CompaniesService';
import { NewCompany } from '@/models/Company';

export default function RegisterPage() {
  const { mutate: createUser } = useCreateUser();
  const { mutate: createCompany } = useCreateCompany();
  const { mutate: updateUser } = useUpdateUser();
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async ({ email, password, type }: BaseUser) => {
    setLoading(true);
    setClientError(null);

    const loginAndRedirect = (user: ExistingUser) => {
      user.id && login(user.id);
      router.push('/jobs');
      setLoading(false);
    };

    try {
      if (!email || !password || !type) {
        throw new Error('All fields are required');
      }

      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new Error('User with given email already exists.');
      }

      const userData: NewUser &
        Partial<NewApplicantUser> &
        Partial<NewCompanyUser> = {
        email,
        password,
        type,
      };

      if (type === UserType.Applicant) {
        // set default name from email
        userData.name = email.split('@')[0];
      }

      // TODO move to server
      createUser(userData, {
        onSuccess: (newUser) => {
          if (!newUser.id) {
            throw new Error('Failed to get user ID after creation.');
          }

          if (type === UserType.Company) {
            const companyData: NewCompany = {
              name: email.split('@')[0],
              email,
              isVerified: false,
            };

            createCompany(companyData, {
              onSuccess: (createdCompany) => {
                const existingCompanyUser = {
                  ...newUser,
                  id: newUser.id,
                  companyData: createdCompany,
                } as ExistingCompanyUser;

                updateUser(existingCompanyUser, {
                  onSuccess: () => {
                    loginAndRedirect(newUser);
                  },
                  onError: (err: any) => {
                    setClientError(
                      err.message || 'Failed to update user with company data.'
                    );
                    setLoading(false);
                  },
                });
              },
            });
          } else {
            loginAndRedirect(newUser);
          }
        },
        onError: (err: any) => {
          setClientError(err.message || 'Registration failed');
        },
        onSettled: () => {
          setLoading(false); // stop loading in both success and error
        },
      });
    } catch (err: any) {
      setClientError(err.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-3">Join Jobs Hunter</h1>
          <p className="text-muted text-center">
            Create an account to apply for jobs or find top talent.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card>
            <Card.Body>
              <h2 className="mb-4 text-center">Register</h2>
              <RegisterForm
                onSubmit={handleRegister}
                isLoading={loading}
                error={clientError}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <small className="text-muted">
            Already have an account?{' '}
            <Link href="/login" className="text-primary">
              Login here
            </Link>
            .
          </small>
        </Col>
      </Row>
    </Container>
  );
}
