import "./Calendar.css";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const toggleModal = () => {
    setShow(!show);
  };

  useEffect(() => {
    setCalendar(buildCal(time));
  }, [time]);

  return (
    <Container fluid className="bg-light">
      <Container className="bg-light">
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
                {week.map((day, jdx) => (
                  <CalendarCell
                    key={jdx}
                    calendar={calendar}
                    now={now}
                    time={time}
                    day={day}
                    toggleModal={toggleModal}
                  />
                ))}
              </Row>
            ))}
          </Container>
        </Container>
        <CalendarModal show={show} onHide={toggleModal} title="Appointment">
          Hello
        </CalendarModal>
      </Container>
    </Container>
  );
}

export default Calendar;
