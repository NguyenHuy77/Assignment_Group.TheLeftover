import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Col, Row, Form, FloatingLabel } from "react-bootstrap";
import { useCalendar } from "./CalendarContext";

function CalendarForm({ event, onClose }) {
  const { state } = useCalendar();
  const { roomsAll, usersAll, dateFocus } = state;

  const [userSelect, setUserSelect] = useState("");
  const [roomSelect, setRoomSelect] = useState("");
  const [hourSelect, setHourSelect] = useState(0);
  const [minuteSelect, setMinuteSelect] = useState(0);
  const [error, setError] = useState(false);

  const endPoint = "/events";

  const formOnSubmit = async () => {
    if (userSelect === "" || roomSelect === "")
      return setError("Please select both doctor and room");
    const data = {
      userID: userSelect,
      room: roomSelect,
      date: dateFocus.hour(hourSelect).minute(minuteSelect).format(),
    };

    const res = await fetch(!event ? endPoint : endPoint + `/${event._id}`, {
      method: !event ? "POST" : "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) setError("Could not add event");

    setUserSelect("");
    setRoomSelect("");
    setHourSelect(0);
    setMinuteSelect(0);
    onClose();
  };

  const eventHour = event && dayjs(event.date).hour();
  const eventMinute = event && dayjs(event.date).minute();

  useEffect(() => {
    if (event) {
      setHourSelect(eventHour);
      setMinuteSelect(eventMinute);
      setUserSelect(event.userId);
      setRoomSelect(event.room);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Form>
      {error && <p className="text-danger">{error}</p>}
      <Form.Label>Choose doctor</Form.Label>
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
      <Form.Label>Choose room</Form.Label>
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
      <Form.Label>Choose time</Form.Label>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingSelectGrid" label="Hour">
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
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingSelectGrid" label="Minute">
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
          </FloatingLabel>
        </Col>
      </Row>
      <Button className="mt-2" onClick={formOnSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default CalendarForm;
