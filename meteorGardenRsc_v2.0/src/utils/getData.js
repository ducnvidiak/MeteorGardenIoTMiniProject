import axios from "axios";
const getData = () => {
  axios
    .get("http://192.168.137.75/")
    .then((res) => {
      const headerDate =
        res.headers && res.headers.date ? res.headers.date : "no response date";
      console.log("Status Code:", res.status);
      console.log("Date in Response header:", headerDate);
      console.log(res.data);
      setData(res.data);
      updateStatus(res.data);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
};

export default getData;
