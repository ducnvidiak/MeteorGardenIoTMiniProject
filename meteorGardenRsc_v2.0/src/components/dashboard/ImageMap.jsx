import Knot from "./Knot";

const ImageMap = ({ status, setStatus }) => {
  let currentStatus = [...status];

  function handleClick(id) {
    currentStatus[id] = !currentStatus[id];
    setStatus(currentStatus);
  }
  return (
    <div className="relative bg-rose-700 inline-block h-80 rounded-lg">
      <img
        src="./images/esp8266.png"
        alt="esp8266"
        className="h-full rounded-lg"
      />
      {currentStatus.map((value, index) => {
        return (
          <Knot
            key={index}
            state={value}
            id={index}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default ImageMap;
