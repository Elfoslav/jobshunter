import { Form } from 'react-bootstrap';

type UrlInputProps = {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function UrlInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}: UrlInputProps) {
  const isInvalid =
    !!value && value !== '' && !/^https?:\/\/[\w.-]+\.[a-z]{2,}/i.test(value);

  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="url"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      />
      <Form.Control.Feedback type="invalid">
        Please enter a valid URL starting with http:// or https://
      </Form.Control.Feedback>
    </Form.Group>
  );
}
