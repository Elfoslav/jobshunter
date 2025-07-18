import React from 'react';
import { Button } from 'react-bootstrap';

export default function LoginRegisterButtons() {
  return (
    <>
      <Button href="/login" variant="outline-primary" className="me-2">
        Login
      </Button>
      <Button href="/register">Register</Button>
    </>
  );
}
