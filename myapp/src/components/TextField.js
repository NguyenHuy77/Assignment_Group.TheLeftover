import { Form } from "react-bootstrap";

function TextField({ label, error, type = "text", id, ...props }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} {...props} />
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form.Group>
  );
}

export default TextField;
