import axios from "axios";

const endPoint = "/patients";

const getPatients = () => axios.get(endPoint);

const getPatient = (id) => axios.get(endPoint + "/" + id);

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
  getPatient,
  postPatient,
  patchPatient,
  deletePatient,
};

export default patientsApi;
