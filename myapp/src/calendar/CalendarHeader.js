import { Row, Col, Button } from "react-bootstrap";
import { useCalendar } from "./CalendarContext";

function CalendarHeader() {
  const { state, update } = useCalendar();
  const { month, now } = state;
  const { setMonth } = update;

  const btnOnPrev = () => {
    setMonth(month.clone().subtract(1, "month"));
  };

  const btnOnNext = () => {
    setMonth(month.clone().add(1, "month"));
  };

  const btnOnToday = () => {
    setMonth(now);
  };

  return (
    <Row>
      <Col>
        <h1 className="h3">
          <span className="text-danger">{month.format("MMMM")}</span>{" "}
          {month.format("YYYY")}
        </h1>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button onClick={btnOnToday} variant="muted" className="me-2">
          Back to today
        </Button>
        <Button onClick={btnOnPrev} className="me-2">
          Prev
        </Button>
        <Button onClick={btnOnNext}>Next</Button>
      </Col>
    </Row>
  );
}

export default CalendarHeader;
