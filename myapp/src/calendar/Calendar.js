import "./Calendar.css";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";

import CalendarHeader from "./CalendarHeader";
import CalendarCell from "./CalendarCell";
import CalendarModal from "./CalendarModal";
import { useCalendar } from "./CalendarContext";

import buildCal from "./buildCal";

function Calendar() {
  const { state, update } = useCalendar();
  const { eventsAll, month, now } = state;
  const { setEventsAll, setUsersAll, setRoomsAll, setMonth } = update;
  const [calendar, setCalendar] = useState([]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const endPoint = "http://localhost:8080/";

  const getEvents = async () => {
    const res = await fetch(endPoint + "events");
    const data = await res.json();
    setEventsAll(data);
  };

  const getUsers = async () => {
    const res = await fetch(endPoint + "users");
    const data = await res.json();
    setUsersAll(data);
  };

  const getRooms = async () => {
    const res = await fetch(endPoint + "rooms");
    const data = await res.json();
    setRoomsAll(data);
  };

  useEffect(() => {
    setCalendar(buildCal(month));
  }, [month]);

  useEffect(() => {
    getEvents();
    getUsers();
    getRooms();
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="bg-light">
      <Container fluid className="my-2">
        <CalendarHeader now={now} time={month} setTime={setMonth} />
      </Container>
      <Container fluid>
        <Container fluid>
          <Row className="mb-1">
            {weekdays.map((day, idx) => (
              <Col key={idx}>{day}</Col>
            ))}
          </Row>
        </Container>
        <Container fluid className="border-bottom border-end bg-white">
          {calendar.map((week, idx) => (
            <Row key={idx}>
              {week.map((day, jdx) => {
                const eventList = eventsAll.filter((event) =>
                  dayjs(event.date).isSame(day, "day")
                );
                return (
                  <CalendarCell
                    key={jdx}
                    calendar={calendar}
                    day={day}
                    events={eventList}
                  />
                );
              })}
            </Row>
          ))}
        </Container>
      </Container>
      <CalendarModal refresh={getEvents} />
    </Container>
  );
}

export default Calendar;
