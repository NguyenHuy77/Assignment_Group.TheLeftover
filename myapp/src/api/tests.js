import axios from "axios";

const endPoint = "/tests";

const getTests = () => axios.get(endPoint);

const getPatientTests = (patientId) =>
  axios.get(endPoint + "/patient/" + patientId);

const postTest = (data) => axios.post(endPoint, data);

const patchTest = (testId, data) =>
  fetch(endPoint + "/" + testId, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

const deleteTest = (testId) => axios.delete(endPoint + "/" + testId);

const testsApi = {
  getTests,
  getPatientTests,
  postTest,
  patchTest,
  deleteTest,
};

export default testsApi;
