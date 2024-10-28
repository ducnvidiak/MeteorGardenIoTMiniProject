import { useState, useEffect } from "react";
import sendData from "../../utils/sendData";
import getData from "../../utils/getData";

const DashBoard = ({ status, setStatus }) => {
  function handleLight() {
    let pinStatus = {
      D0: status[15],
      D3: status[18],
      D4: status[19] === 0 ? 1 : 0,
      D8: status[25],
    };
    sendData(pinStatus);
  }

  function handleWarm() {
    let pinStatus = {
      D0: status[15],
      D3: status[18] === 0 ? 1 : 0,
      D4: status[19],
      D8: status[25],
    };
    sendData(pinStatus);
  }

  function handleSiren() {
    let pinStatus = {
      D0: status[15],
      D3: status[18],
      D4: status[19],
      D8: status[25] === 0 ? 1 : 0,
    };
    sendData(pinStatus);
  }

  function handleRelay() {
    let pinStatus = {
      D0: status[15] === 0 ? 1 : 0,
      D3: status[18],
      D4: status[19],
      D8: status[25],
    };
    sendData(pinStatus);
  }
  function updateStatus(recdata) {
    let newStatus = [...status];
    newStatus[15] = recdata["D0"];
    newStatus[18] = recdata["D3"];
    newStatus[19] = recdata["D4"];
    newStatus[25] = recdata["D8"];
    setStatus(newStatus);
  }
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
    let timeout = setTimeout(function tick() {
      getData();
      timeout = setTimeout(tick, 5000);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-purple-100 relative grow p-10 flex gap-10">
      <div className="absolute top-0 right-10 p-3 text-lg font-bold text-gray-500">
        <p>RealTime:</p>
        <span className="text-base">{data != null ? data.RealTime : ""}</span>
      </div>
      <div className="w-1/3">
        <p>Temperature: {data != null ? data.Temperature.toFixed(2) : ""} °C</p>
        <p>Huminity: {data != null ? data.Huminity : ""} %</p>
        <p>Ground: {data != null ? data.Ground : ""} %</p>
        <p>
          Rain: {data != null ? (data.Rain === 1 ? "no rain" : "raining") : ""}
        </p>
      </div>
      <div className="w-2/3 flex items-center justify-evenly gap-5">
        <button
          className="rounded-lg border-2 border-sky-600 py-1 px-3 text-sky-600"
          onClick={handleLight}
        >
          Turn <span className="text-green-500">on</span>/
          <span className="text-red-500">off</span> garden light
        </button>
        <button
          className="rounded-lg border-2 border-sky-600 py-1 px-3 text-sky-600"
          onClick={handleWarm}
        >
          Turn <span className="text-green-500">on</span>/
          <span className="text-red-500">off</span> garden warm
        </button>
        <button
          className="rounded-lg border-2 border-sky-600 py-1 px-3 text-sky-600"
          onClick={handleSiren}
        >
          Turn <span className="text-green-500">on</span>/
          <span className="text-red-500">off</span> Siren
        </button>
        <button
          className="rounded-lg border-2 border-sky-600 py-1 px-3 text-sky-600"
          onClick={handleRelay}
        >
          Turn <span className="text-green-500">on</span>/
          <span className="text-red-500">off</span> water pumps
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
