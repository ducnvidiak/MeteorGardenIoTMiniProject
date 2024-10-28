import axios from "axios";
const sendData = (pinStatus) => {
  axios
    .post("http://192.168.137.75/update", pinStatus)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default sendData;
