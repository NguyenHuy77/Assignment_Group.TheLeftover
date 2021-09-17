import { Form } from "react-bootstrap";

function SelectField({ label, children, ...props }) {
  return (
    <div>
      <Form.Label>{label}</Form.Label>
      <Form.Select {...props}>{children}</Form.Select>
    </div>
  );
}

export default SelectField;
