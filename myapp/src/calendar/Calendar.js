import "./Calendar.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import dayjs from "dayjs";

import CalendarModal from "./CalendarModal";

import buildCal from "./buildCal";
import CalendarHeader from "./CalendarHeader";
import CalendarCell from "./CalendarCell";

const now = dayjs();

function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [time, setTime] = useState(now);
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState([]);
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
  const endPoint = "http://localhost:9880/events";

  const getEvents = () => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  };

  const addEvents = (data) => {
    fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  };

  const modalOnOpen = (eventList) => {
    setShow(true);
    setEventsCell(eventList);
  };

  const modalOnClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setCalendar(buildCal(time));
  }, [time]);

  useEffect(() => {
    getEvents();
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
                    toggleModal={() => modalOnOpen(eventList)}
                  />
                );
              })}
            </Row>
          ))}
        </Container>
      </Container>
      <CalendarModal show={show} onHide={modalOnClose} events={eventsCell} />
      {/* </Container> */}
    </Container>
  );
}

export default Calendar;
