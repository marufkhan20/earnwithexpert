/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import AdminLayout from "../../component/admin/AdminLayout";
import {
  useDeletedUserMutation,
  useGetUsersQuery,
} from "../../features/user/userApi";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  // get all users
  const { data } = useGetUsersQuery();
  useEffect(() => {
    if (data?.length > 0) {
      setUsers(data);
    }
  }, [data]);

  // delete user
  const [deleteUser, { data: deletedUser }] = useDeletedUserMutation();

  useEffect(() => {
    if (deletedUser?._id) {
      toast.success("User deleted successfully");
      const updatedUsers = users?.filter(
        (user) => user._id !== deletedUser?._id
      );
      setUsers(updatedUsers);
    }
  }, [deletedUser]);

  return (
    <AdminLayout icon={<CgProfile />} title={"Users List"}>
      <div className="p-4 rounded-md bg-white mt-5 flex items-center justify-between gap-5">
        <input
          className="bg-transparent border border-br rounded-md py-2 px-4 outline-none focus:ring-1 w-[300px]"
          placeholder="Search user"
          type="text"
        />
        <Link
          className="py-2 border border-primary text-primary transition-all px-4 hover:bg-primary hover:text-white rounded-md"
          to="/register"
        >
          Create New User
        </Link>
      </div>

      <div className="p-5 mt-5 bg-white border border-br rounded-lg w-full">
        <table class="table-auto w-full border">
          <thead className="bg-[#F8FAFC] border border-br text-left box-border">
            <tr>
              <th className="text-sm py-2 px-4 border-r border-br">SL</th>
              <th className="text-sm py-2 px-4 border-r border-br">Profile</th>
              <th className="text-sm py-2 px-4 border-r border-br">Name</th>
              <th className="text-sm py-2 px-4 border-r border-br">Email</th>
              <th className="text-sm py-2 px-4 border-r border-br">
                National ID
              </th>
              <th className="text-sm py-2 px-4 border-r border-br">Phone</th>
              <th className="text-sm py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length === 0 && (
              <p className="my-2 ml-5">No User Found!!</p>
            )}

            {users?.map((user, idx) => (
              <tr className="border-b border-br hover:bg-[#F1F5F9]">
                <td className="py-4 px-4 border-r border-br">{idx + 1}</td>
                <td className="py-4 px-4 border-r border-br">
                  <img
                    className="w-20 h-20 rounded-full"
                    src={
                      user?.profilePic
                        ? `${process.env.REACT_APP_SERVER_URL}${user?.profilePic}`
                        : "/img/avt.png"
                    }
                    alt="avatar"
                  />
                </td>
                <td className="py-4 px-4 border-r border-br">{`${user?.firstName} ${user?.lastName}`}</td>
                <td className="py-4 px-4 border-r border-br">{user?.email}</td>
                <td className="py-4 px-4 border-r border-br">
                  {user?.nationalId}
                </td>
                <td className="py-4 px-4 border-r border-br">{user?.phone}</td>
                <td className="py-4 px-4 border-r border-br">
                  <div className="flex items-center gap-5">
                    <Link
                      to={`/profile/${user?._id}`}
                      className="bg-primary text-white block py-2 px-4 rounded transition hover:bg-primary/60"
                    >
                      View Profile
                    </Link>
                    <button
                      className="bg-red-700 text-white block py-2 px-4 rounded transition hover:bg-red-700/60"
                      onClick={() => deleteUser(user?._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UsersList;
