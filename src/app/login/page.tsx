'use client';

import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { getUserByEmail } from '@/services/users/UsersService';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useUser();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const user = await getUserByEmail(email);
      if (user) {
        user.id && login(user.id);
        router.push('/jobs');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-3">Welcome to Jobs Hunter!</h1>
          <p className="text-muted text-center">
            Find your next opportunity or post jobs to connect with top talent
            or a job.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Alert variant="info">
            To login as a company, use email: aria@example.com and any password.
          </Alert>
          <Alert variant="info">
            To login as an applicant, use email: john@example.com and any
            password.
          </Alert>
          <Card>
            <Card.Body>
              <h2 className="mb-4 text-center">Login</h2>
              <LoginForm
                onSubmit={handleLogin}
                isLoading={loading}
                error={error}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <small className="text-muted">
            Don`t have an account?{' '}
            <Link href="/register" className="text-primary">
              Sign up here
            </Link>
            .
          </small>
        </Col>
      </Row>
    </Container>
  );
}
