import { Col, ListGroup } from "react-bootstrap";

import dayjs from "dayjs";
import { useCalendar } from "./CalendarContext";

const calHeight = 55; // rem

function CalendarCell({ calendar, day, events }) {
  const { state, update } = useCalendar();
  const { now, month } = state;
  const { setModalShow, setEventsFocus, setDateFocus } = update;

  const style = {
    cell: {
      height: calHeight / calendar.length + "rem",
      color: !month.isSame(day, "month") ? "gray" : "",
      backgroundColor:
        (now.isSame(day, "day") ? "lightblue" : "") ||
        (!month.isSame(day, "month") ? "#EEE" : ""),
    },
    list: {
      color: !month.isSame(day, "month") ? "gray" : "",
      backgroundColor: !month.isSame(day, "month") ? "#EEE" : "",
    },
  };

  const cellOnClick = () => {
    setModalShow(true);
    setEventsFocus(events);
    setDateFocus(day);
  };

  return (
    <Col
      style={style.cell}
      className="border-top border-start hoverable overflow-hidden"
      onClick={cellOnClick}
    >
      <div>{day.format("D")}</div>
      {events && (
        <ListGroup>
          {events.map((event, idx) => (
            <ListGroup.Item key={idx} className="d-flex" style={style.list}>
              <div className="me-auto">
                {dayjs(event.date).format("h:mm a")}
              </div>
              <div className="ms-2">Room {event.room}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
}

export default CalendarCell;
