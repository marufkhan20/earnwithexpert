import React, { useEffect, useState } from "react";
import { GiRamProfile } from "react-icons/gi";
import { Link } from "react-router-dom";
import AdminLayout from "../../component/admin/AdminLayout";
import { useGetExpertProfilesQuery } from "../../features/expertProfile/expertProfileApi";

const ExpertProfilesList = () => {
  const [expertProfiles, setExpertProfiles] = useState([]);

  // get all expert profiles
  const { data } = useGetExpertProfilesQuery();

  useEffect(() => {
    if (data?.length > 0) {
      setExpertProfiles(data);
    }
  }, [data]);

  return (
    <AdminLayout icon={<GiRamProfile />} title={"Expert Profiles"}>
      <div className="p-4 rounded-md bg-white mt-5 flex items-center justify-between gap-5">
        <input
          className="bg-transparent border border-br rounded-md py-2 px-4 outline-none focus:ring-1 w-[300px]"
          placeholder="Search Experts Profile"
          type="text"
        />
        <Link
          className="py-2 border border-primary text-primary transition-all px-4 hover:bg-primary hover:text-white rounded-md"
          to="/admin/expert-profiles/add-expert-profile"
        >
          Create New Profile
        </Link>
      </div>

      <div className="p-5 mt-5 bg-white border border-br rounded-lg w-full">
        <table class="table-auto w-full border">
          <thead className="bg-[#F8FAFC] border border-br text-left box-border">
            <tr>
              <th className="text-sm py-2 px-4 border-r border-br">SL</th>
              <th className="text-sm py-2 px-4 border-r border-br">Profile</th>
              <th className="text-sm py-2 px-4 border-r border-br">Name</th>
              <th className="text-sm py-2 px-4 border-r border-br">
                Description
              </th>
              <th className="text-sm py-2 px-4 border-r border-br">USDT</th>
              <th className="text-sm py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expertProfiles?.length === 0 && (
              <p className="my-2 ml-5">No User Found!!</p>
            )}

            {expertProfiles?.map((profile) => (
              <tr className="border-b border-br hover:bg-[#F1F5F9]">
                <td className="py-4 px-4 border-r border-br">1</td>
                <td className="py-4 px-4 border-r border-br">
                  <img
                    className="w-20 h-20 rounded-full"
                    src={
                      profile?.profilePic
                        ? `${process.env.REACT_APP_SERVER_URL}${profile?.profilePic}`
                        : "/img/avt.png"
                    }
                    alt="avatar"
                  />
                </td>
                <td className="py-4 px-4 border-r border-br">
                  {profile?.name}
                </td>
                <td className="py-4 px-4 border-r border-br">
                  {profile?.description?.slice(0, 100)} ...
                </td>
                <td className="py-4 px-4 border-r border-br">
                  ${`${profile?.minimumPrice}-${profile?.maximumPrice}`}
                </td>
                <td className="py-4 px-4 border-r border-br">
                  <div className="flex items-center gap-5">
                    <button className="bg-primary text-white block py-2 px-4 rounded transition hover:bg-primary/60">
                      Edit
                    </button>
                    <button className="bg-red-700 text-white block py-2 px-4 rounded transition hover:bg-red-700/60">
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

export default ExpertProfilesList;
