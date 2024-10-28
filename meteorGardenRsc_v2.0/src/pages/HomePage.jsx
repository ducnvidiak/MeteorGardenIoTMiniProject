import { useState } from "react";
import DashBoard from "../components/dashboard/DashBoard";
import ImageMap from "../components/dashboard/ImageMap";

const HomePage = () => {
  const [status, setStatus] = useState(new Array(30).fill(0));
  return (
    <div className="relative w-full flex flex-col items-center justify-center pt-28 px-10">
      <div className="flex justify-center">
        <h2 className="text-5xl text-center text-gray-100 font-bold ">
          Remote Control System
        </h2>
      </div>
      <div className="w-full flex gap-10 pt-20">
        <DashBoard status={status} setStatus={setStatus} />
        <ImageMap status={status} setStatus={setStatus} />
      </div>
    </div>
  );
};

export default HomePage;
