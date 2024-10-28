const Knot = ({ state, id, handleClick }) => {
  let classNames =
    "flex justify-center items-center absolute text-white rounded-full cursor-pointer";
  if (state) {
    classNames += " bg-rose-800";
  } else {
    classNames += " bg-emerald-800";
  }
  if (id < 15) {
    classNames += " left-44";
  } else {
    classNames += " right-72";
  }

  let top = 17.5;

  if (id < 15) top += id * 4.4;
  else top += (id - 15) * 4.4;

  let left;
  if (id < 15) {
    left = 1;
  } else {
    left = 92.5;
  }

  let styles = {
    top: top + "%",
    left: left + "%",
    width: "6.4%",
    height: "3.5%",
    fontSize: "70%",
  };

  return (
    <div
      className={classNames}
      style={styles}
      onClick={() => {
        handleClick(id);
      }}
    >
      {id}
    </div>
  );
};

export default Knot;
