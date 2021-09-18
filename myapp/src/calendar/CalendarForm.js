import dayjs from "dayjs";
import { useState } from "react";
import { Button, Col, Row, Form, Alert } from "react-bootstrap";
import { useCalendar } from "./CalendarContext";

import eventsApi from "../api/events";

function CalendarForm({ event, onClose }) {
  const { state } = useCalendar();
  const { roomsAll, usersAll, dateFocus } = state;

  const eventHour = event && dayjs(event.date).hour();
  const eventMinute = event && dayjs(event.date).minute();

  const [userSelect, setUserSelect] = useState(event ? event.userId : "");
  const [roomSelect, setRoomSelect] = useState(event ? event.room : "");
  const [hourSelect, setHourSelect] = useState(event ? eventHour : 0);
  const [minuteSelect, setMinuteSelect] = useState(event ? eventMinute : 0);
  const [error, setError] = useState(false);

  const formOnSubmit = async () => {
    if (userSelect === "" || roomSelect === "")
      return setError("Please select both doctor and room");

    const data = {
      userID: userSelect,
      room: roomSelect,
      date: dateFocus.hour(hourSelect).minute(minuteSelect).format(),
    };

    const res = await (!event
      ? eventsApi.postEvent(data)
      : eventsApi.patchEvent(event._id, data));

    setUserSelect("");
    setRoomSelect("");
    setHourSelect(0);
    setMinuteSelect(0);
    onClose();
  };

  return (
    <Form>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Label>Doctor</Form.Label>
      <Form.Select
        required
        onChange={(e) => {
          if (error) setError(false);
          setUserSelect(e.target.value);
        }}
      >
        <option value="">-- Select --</option>
        {usersAll &&
          usersAll.map((user, idx) => {
            if (event && event.userID === user._id) {
              return (
                <option key={idx} selected defaultValue={user._id}>
                  {user.name} - {user._id}
                </option>
              );
            }
            return (
              <option key={idx} value={user._id}>
                {user.name} - {user._id}
              </option>
            );
          })}
      </Form.Select>
      <Form.Label>Room</Form.Label>
      <Form.Select
        required
        onChange={(e) => {
          if (error) setError(false);
          setRoomSelect(e.target.value);
        }}
      >
        <option value="">-- Select --</option>
        {roomsAll &&
          roomsAll.map((room, idx) => {
            if (event && event.room === room.roomNumber) {
              return (
                <option key={idx} selected defaultValue={room.roomNumber}>
                  {room.roomNumber}
                </option>
              );
            }
            return (
              <option key={idx} value={room.roomNumber}>
                {room.roomNumber}
              </option>
            );
          })}
      </Form.Select>
      <Row className="g-2">
        <Col md>
          <Form.Label>Hour</Form.Label>
          <Form.Select
            onChange={(e) => {
              if (error) setError(false);
              setHourSelect(e.target.value);
            }}
          >
            {[...Array(24).keys()].map((hour, idx) => {
              if (event && eventHour === hour) {
                return (
                  <option key={idx} selected defaultValue={hour}>
                    {hour < 10 && 0}
                    {hour}
                  </option>
                );
              }
              return (
                <option key={idx} value={hour}>
                  {hour < 10 && 0}
                  {hour}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col md>
          <Form.Label>Minute</Form.Label>
          <Form.Select
            onChange={(e) => {
              if (error) setError(false);
              setMinuteSelect(e.target.value);
            }}
          >
            {[...Array(60).keys()].map((min, idx) => {
              if (event && eventMinute === min) {
                return (
                  <option key={idx} selected defaultValue={min}>
                    {min < 10 && 0}
                    {min}
                  </option>
                );
              }
              return (
                <option key={idx} value={min}>
                  {min < 10 && 0}
                  {min}
                </option>
              );
            })}
          </Form.Select>
        </Col>
      </Row>
      <Button className="mt-2" onClick={formOnSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default CalendarForm;
