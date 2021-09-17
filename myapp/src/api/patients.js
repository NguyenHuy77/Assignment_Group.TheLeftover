import axios from "axios";

const endPoint = "/patients";

const getPatients = () => axios.get(endPoint);

const postPatient = (data) => axios.post(endPoint, data);

const patchPatient = (patientId, data) =>
  fetch(endPoint + "/" + patientId, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

const deletePatient = (patientId) => axios.delete(endPoint + "/" + patientId);

const patientsApi = {
  getPatients,
  postPatient,
  patchPatient,
  deletePatient,
};

export default patientsApi;
