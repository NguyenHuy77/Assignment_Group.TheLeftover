import "./Calendar.css";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";

import CalendarHeader from "./CalendarHeader";
import CalendarCell from "./CalendarCell";
import CalendarModal from "./CalendarModal";

import buildCal from "./buildCal";

const now = dayjs();

function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [time, setTime] = useState(now);
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [dayCell, setDayCell] = useState(now);
  const [eventsCell, setEventsCell] = useState([]);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const endPoint = "http://localhost:9880/";

  const getEvents = async () => {
    const res = await fetch(endPoint + "events");
    const data = await res.json();
    setEvents(data);
  };

  const getUsers = async () => {
    const res = await fetch(endPoint + "users");
    const data = await res.json();
    setUsers(data);
  };

  const getRooms = async () => {
    const res = await fetch(endPoint + "rooms");
    const data = await res.json();
    setRooms(data);
  };

  const modalOnOpen = (day, eventList) => {
    setShow(true);
    setDayCell(day);
    setEventsCell(eventList);
  };

  const modalOnClose = () => {
    setShow(false);
  };

  const modalOnAdd = () => {
    getEvents();
  };

  useEffect(() => {
    setCalendar(buildCal(time));
  }, [time]);

  useEffect(() => {
    getEvents();
    getUsers();
    getRooms();
  }, []);

  return (
    <Container fluid className="bg-light">
      {/* <Container className="bg-light"> */}
      <Container fluid className="my-2">
        <CalendarHeader now={now} time={time} setTime={setTime} />
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
                const eventList = events.filter((event) =>
                  dayjs(event.date).isSame(day, "day")
                );
                return (
                  <CalendarCell
                    key={jdx}
                    calendar={calendar}
                    now={now}
                    time={time}
                    day={day}
                    events={eventList}
                    toggleModal={() => modalOnOpen(day, eventList)}
                  />
                );
              })}
            </Row>
          ))}
        </Container>
      </Container>
      <CalendarModal
        show={show}
        onHide={modalOnClose}
        events={eventsCell}
        users={users}
        rooms={rooms}
        day={dayCell}
        refresh={modalOnAdd}
      />
      {/* </Container> */}
    </Container>
  );
}

export default Calendar;
