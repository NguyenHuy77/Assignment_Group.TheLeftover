import axios from "axios";

const endPoint = "/events";

const getEvents = () => axios.get(endPoint);

const getUserEvents = (userId) => axios.get(endPoint + "/" + userId);

const postEvent = (data) => axios.post(endPoint, data);

const patchEvent = (eventId, data) =>
  fetch(endPoint + "/" + eventId, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

const deleteEvent = (eventId) => axios.delete(endPoint + "/" + eventId);

const eventsApi = {
  getEvents,
  getUserEvents,
  postEvent,
  patchEvent,
  deleteEvent,
};

export default eventsApi;
