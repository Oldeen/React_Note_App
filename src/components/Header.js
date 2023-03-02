import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="app-header">
        <h1>Notes List</h1>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
