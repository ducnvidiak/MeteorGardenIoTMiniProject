import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-20 w-full flex items-center justify-between px-14 py-8 border-b-2 border-blue-200">
      <h1 className="text-5xl font-bold text-blue-500">
        <Link to="/">RCS</Link>
      </h1>
      <div className="flex gap-16 items-center text-xl font-medium text-slate-50">
        <Link to="/" className="hover:text-blue-500 hover:scale-125">
          Home
        </Link>
        <Link
          to="/garden-manager"
          className="hover:text-blue-500 hover:scale-125"
        >
          Garden Manager
        </Link>
        <Link to="/log-data" className="hover:text-blue-500 hover:scale-125">
          Log Data
        </Link>
        <Link to="/sign-up" className="hover:text-blue-500 hover:scale-125">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
