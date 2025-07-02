'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import RegisterForm from './components/RegisterForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserType } from '@/models/User';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (
    email: string,
    password: string,
    role: UserType
  ) => {
    setLoading(true);
    setError(null);

    try {
      // 🔐 Replace this with your backend registration logic
      if (email && password && name && role) {
        router.push('/jobs');
      } else {
        throw new Error('All fields are required');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
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
                error={error}
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
