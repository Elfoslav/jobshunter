import React from 'react';
import { Form, Col } from 'react-bootstrap';

interface RemotePercentageInputProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  controlId?: string;
}

const RemotePercentageInput: React.FC<RemotePercentageInputProps> = ({
  value,
  onChange,
  label = 'Remote Percentage',
  name = 'remotePercentage',
  controlId = 'remotePercentage',
}) => {
  return (
    <Form.Group controlId={controlId} className="mb-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="number"
        name={name}
        value={value}
        onChange={onChange}
      />
      <Form.Range value={value} onChange={onChange} />
    </Form.Group>
  );
};

export default RemotePercentageInput;
