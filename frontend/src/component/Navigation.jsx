import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userLoggedOut } from "../features/auth/authSlice";

const Navigation = ({ setPlayGame }) => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth) || {};
  const [profileView, setProfileView] = useState(false);

  const dispatch = useDispatch();

  // logout
  const logout = () => {
    dispatch(userLoggedOut());
  };

  useEffect(() => {
    setProfileView(false);
  }, [pathname]);
  return (
    <nav className="bg-white border-b border-br">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-14">
            <div>
              <Link to="/" className="flex items-center gap-2">
                <img src="/img/logo.png" alt="logo" />
                <span className="font-bold text-xl">Logo Here</span>
              </Link>
            </div>
            <div>
              <ul className="flex items-center gap-6">
                <li className="text-base font-bold text-dark py-3 px-4 cursor-pointer transition-all hover:text-white hover:bg-primary">
                  <Link to="/">Home</Link>
                </li>
                <li className="text-base font-bold text-dark py-3 px-4 cursor-pointer transition-all hover:text-white hover:bg-primary">
                  <Link to="/">About</Link>
                </li>
                <li className="text-base font-bold text-dark py-3 px-4 cursor-pointer transition-all hover:text-white hover:bg-primary">
                  <Link to="/">Blog</Link>
                </li>
                <li className="text-base font-bold text-dark py-3 px-4 cursor-pointer transition-all hover:text-white hover:bg-primary">
                  <Link to="/">Contact us</Link>
                </li>
              </ul>
            </div>
          </div>
          {user?._id ? (
            <div className="flex items-center gap-2 relative">
              <button
                className="py-2 px-6 block bg-primary text-white rounded-full"
                onClick={() => setPlayGame(true)}
              >
                Play Game
              </button>
              <div
                onClick={() => setProfileView(!profileView)}
                className="w-10 h-10 rounded-full ml-3 p-[2px] border-2 cursor-pointer border-primary"
              >
                <img
                  className="rounded-full h-full w-full"
                  src={
                    user?.profilePic
                      ? `${process.env.REACT_APP_SERVER_URL}${user?.profilePic}`
                      : "/img/avt.png"
                  }
                  alt="user"
                />
              </div>

              {profileView && (
                <div className="absolute top-[150%] right-0 min-w-[250px] text-center z-50">
                  <div className="border border-br shadow-md bg-white py-5 rounded-md">
                    <div className="w-12 h-12 rounded-full p-[2px] border-2 border-primary mx-auto">
                      <img
                        className="rounded-full h-full w-full"
                        src={
                          user?.profilePic
                            ? `${process.env.REACT_APP_SERVER_URL}${user?.profilePic}`
                            : "/img/avt.png"
                        }
                        alt="user"
                      />
                    </div>
                    <div className="pb-6 border-b border-br">
                      <h3 className="mt-2">
                        {user?.firstName + " " + user?.lastName}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 font-semibold">
                        {user?.email}
                      </p>
                    </div>
                    <div className="text-left mt-2">
                      <ul>
                        {user?.role === "admin" && (
                          <li className="py-2 px-5 text-sm font-medium transition hover:bg-light hover:text-primary cursor-pointer">
                            <Link to="/admin" className="block">
                              Admin Panel
                            </Link>
                          </li>
                        )}
                        <li className="py-2 px-5 text-sm font-medium transition hover:bg-light hover:text-primary cursor-pointer">
                          <Link to={`/profile/${user?._id}`} className="block">
                            My Profile
                          </Link>
                        </li>
                        <li
                          className="py-2 px-5 text-sm font-medium transition hover:bg-light hover:text-primary cursor-pointer"
                          onClick={logout}
                        >
                          Sign out
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                to="/register"
                className="py-2 px-6 block bg-primary text-white rounded-full"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="py-2 px-6 block bg-primary text-white rounded-full"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
