import { useState } from "react";
import { Button, Modal, ListGroup, Col } from "react-bootstrap";

import dayjs from "dayjs";
import CalendarForm from "./CalendarForm";

function MyModal({ show = false, onHide, events, rooms, users, day, refresh }) {
  // const [events, setEvents] = useState(eventsCell);
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [userSelect, setUserSelect] = useState("");
  const [roomSelect, setRoomSelect] = useState("");
  const [hourSelect, setHourSelect] = useState(0);
  const [minuteSelect, setMinuteSelect] = useState(0);
  const [eventEdit, setEventEdit] = useState(null);
  const [error, setError] = useState(false);

  const endPoint = "http://localhost:9880/events";

  const formOnSubmit = async () => {
    if (userSelect === "" || roomSelect === "")
      return setError("Please select both doctor and room");
    const userSelected = users.filter((user) => user.id == userSelect)[0];
    const data = {
      name: userSelected.name,
      userId: userSelect,
      room: roomSelect,
      date: day.hour(hourSelect).minute(minuteSelect).format(),
    };
    const res = await fetch(((!toggleEdit ? endPoint : endPoint + `/${eventEdit.id}`) ), {
      method: !toggleEdit ? "POST" : "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 500) return setError("Could not add event");

    refresh();

    setUserSelect("");
    setRoomSelect("");
    setHourSelect(0);
    setMinuteSelect(0);
    handleClose();
  };

  const handleClose = () => {
    setError(false);
    setToggleForm(false);
    setToggleEdit(false);
    onHide();
    setToggleDelete(false);
  };

  const handleClick = (event) => {
    if (toggleDelete) {
      handleDelete(event.id);
      refresh();
      handleClose();
    } else {
      setToggleForm(true);
      setToggleEdit(true);
      setEventEdit(event);
    }
  };

  const handleAdd = () => {
    setEventEdit(null);
    setToggleForm(!toggleForm);
  };

  const handleDelete = async (id) => {
    await fetch("http://localhost:9880/events/" + id, {
      method: "DELETE",
    });
  };

  if (!show) return null;

  return (
    <Modal centered show={show} onHide={onHide} backdrop="static" size="lg">
      <Modal.Header>
        <Modal.Title>Appointment</Modal.Title>
        <div>
          {!toggleForm && toggleDelete && (
            <span className="text-danger">Click on event to delete</span>
          )}
          <Button
            variant="light"
            className="mx-2"
            onClick={() => setToggleDelete(!toggleDelete)}
          >
            Delete
          </Button>
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </Modal.Header>

      <Modal.Body className="modal-body">
        {!toggleForm && events.length === 0 && <p>No appoinment yet</p>}
        {!toggleForm && events.length > 0 && (
          <ListGroup className="overflow-hidden">
            {events.map((event, idx) => (
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
        {error && <p className="text-danger">{error}</p>}
        {toggleForm && (
          <CalendarForm
            users={users}
            rooms={rooms}
            error={error}
            setError={setError}
            setUserSelect={setUserSelect}
            setRoomSelect={setRoomSelect}
            setHourSelect={setHourSelect}
            setMinuteSelect={setMinuteSelect}
            event={eventEdit}
            formOnSubmit={formOnSubmit}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
