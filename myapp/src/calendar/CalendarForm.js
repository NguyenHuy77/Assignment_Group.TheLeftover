import dayjs from "dayjs";
import { useEffect } from "react";
import { Button, Col, Row, Form, FloatingLabel } from "react-bootstrap";

function CalendarForm({
  users,
  rooms,
  error,
  setError,
  setUserSelect,
  setRoomSelect,
  setHourSelect,
  setMinuteSelect,
  formOnSubmit,
  event = null,
}) {
  const eventHour = event && dayjs(event.date).hour();
  const eventMinute = event && dayjs(event.date).minute();

  useEffect(() => {
    if (event) {
      setUserSelect(event.userId);
      setRoomSelect(event.room);
      setHourSelect(eventHour);
      setMinuteSelect(eventMinute);
    }
  }, []);

  return (
    <Form>
      <Form.Label>Choose doctor</Form.Label>
      <Form.Select
        required
        onChange={(e) => {
          if (error) setError(false);
          setUserSelect(e.target.value);
        }}
      >
        <option value="">-- Select --</option>
        {users &&
          users.map((user, idx) => {
            if (event && event.userId == user.id) {
              return (
                <option key={idx} selected defaultValue={user.id}>
                  {user.name} - {user.id}
                </option>
              );
            }
            return (
              <option key={idx} value={user.id}>
                {user.name} - {user.id}
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
        {rooms &&
          rooms.map((room, idx) => {
            if (event && event.room == room.roomNumber) {
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
