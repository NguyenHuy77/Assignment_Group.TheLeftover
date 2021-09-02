import { Col } from "react-bootstrap";

const calHeight = 55; // rem

function CalendarCell({ calendar, now, time, day, toggleModal }) {
  return (
    <Col
      style={{
        height: calHeight / calendar.length + "rem",
        color: !time.isSame(day, "month") ? "gray" : "",
        backgroundColor:
          (now.isSame(day, "day") ? "lightblue" : "") ||
          (!time.isSame(day, "month") ? "#EEE" : ""),
      }}
      className="border-top border-start hoverable"
      onClick={toggleModal}
    >
      {day.format("D")}
    </Col>
  );
}

export default CalendarCell;
