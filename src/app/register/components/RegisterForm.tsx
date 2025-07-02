'use client';

import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { UserType } from '@/models/User';

interface RegisterFormProps {
  onSubmit: (
    email: string,
    password: string,
    role: UserType.Applicant | UserType.Company
  ) => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function RegisterForm({
  onSubmit,
  isLoading = false,
  error = null,
}: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserType>(UserType.Applicant);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, role);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Registering as</Form.Label>
        <Form.Select
          value={role}
          onChange={(e) => setRole(e.target.value as UserType)}
        >
          <option value={UserType.Applicant}>Applicant</option>
          <option value={UserType.Company}>Company</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" disabled={isLoading} className="w-100">
        {isLoading ? <Spinner size="sm" animation="border" /> : 'Register'}
      </Button>
    </Form>
  );
}
