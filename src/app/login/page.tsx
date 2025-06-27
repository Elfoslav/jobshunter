// app/login/page.tsx
'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // 🔐 Replace this with real login logic
      if (email === 'demo@example.com' && password === 'password') {
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
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6}>
          <Card>
            <Card.Body>
              <h2 className="mb-4">Login</h2>
              <LoginForm
                onSubmit={handleLogin}
                isLoading={loading}
                error={error}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
