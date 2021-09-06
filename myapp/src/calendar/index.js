import Cal from "./Calendar";
import { CalendarProvider } from "./CalendarContext";

export default function Calendar() {
  return (
    <CalendarProvider>
      <Cal />
    </CalendarProvider>
  );
}
