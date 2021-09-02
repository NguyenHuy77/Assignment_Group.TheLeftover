import { Button, Modal } from "react-bootstrap";

function MyModal({ children, show = false, onHide, title }) {
  if (!show) return null;

  return (
    <Modal
      centered
      show={show}
      onHide={onHide}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
