import "./Calendar.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import dayjs from "dayjs";

import CalendarHeader from "./CalendarHeader";
import CalendarCell from "./CalendarCell";
import CalendarModal from "./CalendarModal";
import { useCalendar } from "./CalendarContext";

import buildCal from "./buildCal";
import eventsApi from "../api/events";
import usersApi from "../api/users";
import roomsApi from "../api/rooms";
import Loader from "../components/Loader";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Calendar() {
  const { state, update } = useCalendar();
  const { eventsAll, month, now } = state;
  const { setEventsAll, setUsersAll, setRoomsAll, setMonth } = update;
  const [calendar, setCalendar] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getEvents = async () => {
    setError("");

    setLoading(true);
    const res = await eventsApi.getEvents();
    setLoading(false);

    if (res.statusText !== "OK") return setError("Error when fetching events");

    setError("");
    setEventsAll(res.data);
  };

  const getUsers = async () => {
    const res = await usersApi.getUsers();
    setUsersAll(res.data);
  };

  const getRooms = async () => {
    const res = await roomsApi.getRooms();
    setRoomsAll(res.data);
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
    <>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="my-2">
        <CalendarHeader now={now} time={month} setTime={setMonth} />
      </div>
      <div>
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
      </div>
      <CalendarModal />
    </>
  );
}

export default Calendar;
