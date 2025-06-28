// components/LoginForm.tsx
'use client';

import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export default function LoginForm({
  onSubmit,
  isLoading = false,
  error = null,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </Form.Group>

      <div className="d-grid">
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
        </Button>
      </div>
    </Form>
  );
}
