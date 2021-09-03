import { Button, Modal, ListGroup, Col, Row } from "react-bootstrap";

import dayjs from "dayjs";

function MyModal({ show = false, onHide, events }) {
  if (!show) return null;

  return (
    <Modal centered show={show} onHide={onHide} backdrop="static" size="lg">
      <Modal.Header>
        <Modal.Title>Appointment</Modal.Title>
        <Button>Add</Button>
      </Modal.Header>

      <Modal.Body className="modal-body">
        {events && (
          <ListGroup className="overflow-hidden">
            {events.map((event, idx) => (
              <ListGroup.Item key={idx} className="d-flex">
                <Col>{dayjs(event.date).format("h:mm a")}</Col>
                <Col className="ms-2">{event.name}</Col>
                <Col className="ms-2">Room {event.room}</Col>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
