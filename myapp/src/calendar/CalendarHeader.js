import { Container, Row, Col, Button } from "react-bootstrap";

function CalendarHeader({ now, time, setTime }) {
  const nextMonth = () => {
    return time.clone().add(1, "month");
  };

  const prevMonth = () => {
    return time.clone().subtract(1, "month");
  };

  return (
    <Row>
      <Col>
        <h1 className="h3">
          <span className="text-danger">{time.format("MMMM")}</span>{" "}
          {time.format("YYYY")}
        </h1>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button onClick={() => setTime(now)} variant="muted" className="me-2">
          Back to today
        </Button>
        <Button onClick={() => setTime(prevMonth())} className="me-2">
          Prev
        </Button>
        <Button onClick={() => setTime(nextMonth())}>Next</Button>
      </Col>
    </Row>
  );
}

export default CalendarHeader;
