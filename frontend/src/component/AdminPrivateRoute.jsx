import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminPrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const isLoggeIn = useAuth();

  return isLoggeIn && user?.role === "admin" ? (
    children
  ) : (
    <Navigate to={`/profile/${user?._id}`} />
  );
};

export default AdminPrivateRoute;
