import React, { useContext, useState } from "react";

import dayjs from "dayjs";

const CalendarContext = React.createContext();

export function useCalendar() {
  return useContext(CalendarContext);
}

export function CalendarProvider({ children }) {
  const now = dayjs();
  const [eventsAll, setEventsAll] = useState([]);
  const [eventsFocus, setEventsFocus] = useState([]);
  const [dateFocus, setDateFocus] = useState(now);
  const [usersAll, setUsersAll] = useState([]);
  const [roomsAll, setRoomsAll] = useState([]);
  const [month, setMonth] = useState(now);
  const [modalShow, setModalShow] = useState(false);

  return (
    <CalendarContext.Provider
      value={{
        state: {
          eventsAll,
          eventsFocus,
          usersAll,
          roomsAll,
          month,
          now,
          modalShow,
          dateFocus,
        },
        update: {
          setEventsAll,
          setEventsFocus,
          setUsersAll,
          setRoomsAll,
          setMonth,
          setModalShow,
          setDateFocus,
        },
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
