import axios from "axios";

const endPoint = "/rooms";

const getRooms = () => axios.get(endPoint);

const postRoom = (data) => axios.post(endPoint, data);

const patchRoom = (roomId, data) =>
  fetch(endPoint + "/" + roomId, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

const deleteRoom = (roomId) => axios.delete(endPoint + "/" + roomId);

const roomsApi = {
  getRooms,
  postRoom,
  patchRoom,
  deleteRoom,
};

export default roomsApi;
