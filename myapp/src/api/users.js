import axios from "axios";

const endPoint = "/users";

const getUsers = () => axios.get(endPoint);

const postUser = (data) => axios.post(endPoint, data);

const patchUser = (userId, data) =>
  fetch(endPoint + "/" + userId, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

const deleteUser = (userId) => axios.delete(endPoint + "/" + userId);

const usersApi = {
  getUsers,
  postUser,
  patchUser,
  deleteUser,
};

export default usersApi;
