import { useState } from "react";
import { Button, Modal, ListGroup, Col } from "react-bootstrap";

import dayjs from "dayjs";
import CalendarForm from "./CalendarForm";
import { useCalendar } from "./CalendarContext";

function CalendarModal({ refresh }) {
  const { state, update } = useCalendar();
  const { modalShow, eventsFocus } = state;
  const { setModalShow } = update;

  const [toggleForm, setToggleForm] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [eventEdit, setEventEdit] = useState(null);

  const endPoint = "http://localhost:8080/events";

  const handleClick = (event) => {
    if (toggleDelete) {
      handleDelete(event.id);
      refresh();
      modalOnClose();
    } else {
      setToggleForm(true);
      setEventEdit(event);
    }
  };

  const handleAdd = () => {
    setEventEdit(null);
    setToggleForm(!toggleForm);
  };

  const handleDelete = async (id) => {
    await fetch(endPoint + id, {
      method: "DELETE",
    });
  };

  const modalOnClose = () => {
    setToggleForm(false);
    setToggleDelete(false);
    setModalShow(false);
  };

  const formSuccess = async () => {
    await refresh();
    modalOnClose();
  };

  if (!modalShow) return null;

  return (
    <Modal
      centered
      show={modalShow}
      onHide={modalOnClose}
      backdrop="static"
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>Appointment</Modal.Title>
        <div>
          {!toggleForm && toggleDelete && (
            <span className="text-danger">Click on event to delete</span>
          )}
          {!toggleForm && (
            <Button
              variant="light"
              className="mx-2"
              onClick={() => setToggleDelete(!toggleDelete)}
            >
              Delete
            </Button>
          )}
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </Modal.Header>

      <Modal.Body className="modal-body">
        {!toggleForm && eventsFocus.length === 0 && <p>No appointment yet</p>}
        {!toggleForm && eventsFocus.length > 0 && (
          <ListGroup className="overflow-hidden">
            {eventsFocus.map((event, idx) => (
              <ListGroup.Item
                key={idx}
                className="d-flex hoverable"
                onClick={() => handleClick(event)}
              >
                <Col>{dayjs(event.date).format("h:mm a")}</Col>
                <Col className="ms-2">{event.name}</Col>
                <Col className="ms-2">Room {event.room}</Col>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {toggleForm && (
          <CalendarForm
            event={eventEdit}
            refresh={refresh}
            onClose={formSuccess}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={modalOnClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CalendarModal;
