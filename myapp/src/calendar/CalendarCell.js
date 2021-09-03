import { Col, ListGroup } from "react-bootstrap";

import dayjs from "dayjs";

const calHeight = 55; // rem

function CalendarCell({ calendar, now, time, day, events, toggleModal }) {
  const style = {
    cell: {
      height: calHeight / calendar.length + "rem",
      color: !time.isSame(day, "month") ? "gray" : "",
      backgroundColor:
        (now.isSame(day, "day") ? "lightblue" : "") ||
        (!time.isSame(day, "month") ? "#EEE" : ""),
    },
    list: {
      color: !time.isSame(day, "month") ? "gray" : "",
      backgroundColor: !time.isSame(day, "month") ? "#EEE" : "",
    },
  };

  return (
    <Col
      style={style.cell}
      className="border-top border-start hoverable overflow-hidden"
      onClick={toggleModal}
    >
      <div>{day.format("D")}</div>
      {events && (
        <ListGroup>
          {events.map((event, idx) => (
            <ListGroup.Item key={idx} className="d-flex" style={style.list}>
              <div className="me-auto">{dayjs(event.date).format("h:mm a")}</div>
              <div className="ms-2">Room {event.room}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
}

export default CalendarCell;
