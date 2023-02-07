import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AdminPrivateRoute from "./component/AdminPrivateRoute";
import Navigation from "./component/Navigation";
import PrivateRoute from "./component/PrivateRoute";
import PublicRoute from "./component/PublicRoute";
import ExpertProfiles from "./pages/ExpertProfiles";
import Games from "./pages/Game/Games";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AddExperProfile from "./pages/admin/AddExperProfile";
import Admin from "./pages/admin/Admin";
import Deposits from "./pages/admin/Deposits";
import ExpertProfilesList from "./pages/admin/ExpertProfilesList";
import HireRequests from "./pages/admin/HireRequests";
import UsersList from "./pages/admin/UsersList";
import WidthrawRequests from "./pages/admin/WidthrawRequests";

const App = () => {
  const [playGame, setPlayGame] = useState(false);
  return (
    <>
      <Toaster />
      <Navigation setPlayGame={setPlayGame} />
      <Games playGame={playGame} />
      <Routes>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/profile/:profileId"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/expert-profiles" element={<ExpertProfiles />} />

        {/* admin routes */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <Admin />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/expert-profiles"
          element={
            <AdminPrivateRoute>
              <ExpertProfilesList />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/expert-profiles/add-expert-profile"
          element={
            <AdminPrivateRoute>
              <AddExperProfile />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminPrivateRoute>
              <UsersList />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/deposits"
          element={
            <AdminPrivateRoute>
              <Deposits />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/widthraw-requests"
          element={
            <AdminPrivateRoute>
              <WidthrawRequests />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/hire-requests"
          element={
            <AdminPrivateRoute>
              <HireRequests />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
