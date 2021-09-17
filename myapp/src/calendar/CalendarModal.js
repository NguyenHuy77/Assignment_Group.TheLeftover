import { useState } from "react";
import { Button, Modal, ListGroup, Col, Alert } from "react-bootstrap";

import dayjs from "dayjs";
import CalendarForm from "./CalendarForm";
import { useCalendar } from "./CalendarContext";
import eventsApi from "../api/events";

function CalendarModal({ refresh }) {
  const { state, update } = useCalendar();
  const { modalShow, eventsFocus } = state;
  const { setModalShow, setEventsAll } = update;
  const [error, setError] = useState("");

  const [toggleForm, setToggleForm] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [eventEdit, setEventEdit] = useState(null);

  const getEvents = async () => {
    const res = await eventsApi.getEvents();
    setEventsAll(res.data);
  };

  const handleClick = (event) => {
    setError("");
    if (toggleDelete) {
      handleDelete(event._id);
    } else {
      setToggleForm(true);
      setEventEdit(event);
    }
  };

  const handleAdd = () => {
    setError("");
    setToggleDelete(false);
    setEventEdit(null);
    setToggleForm(!toggleForm);
  };

  const handleDelete = async (id) => {
    const res = await eventsApi.deleteEvent(id);

    if (res.statusText !== "OK") return setError("Cannot delete appointment");

    setError("");
    getEvents();
    modalOnClose();
  };

  const modalOnClose = () => {
    setToggleForm(false);
    setToggleDelete(false);
    setModalShow(false);
  };

  const formSuccess = () => {
    getEvents();
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
          <Button onClick={handleAdd}>{toggleForm ? "Back" : "Add"}</Button>
        </div>
      </Modal.Header>

      <Modal.Body className="modal-body">
        {error && <Alert variant="danger">{error}</Alert>}
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
