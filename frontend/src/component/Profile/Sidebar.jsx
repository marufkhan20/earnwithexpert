import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { GiRamProfile } from "react-icons/gi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiLock2Line, RiMoneyDollarCircleLine } from "react-icons/ri";
import { useUpdateProfilePicMutation } from "../../features/user/userApi";
import useUpdateUser from "../../hooks/useUpdateUser";

const Sidebar = ({ user, activeTab, setActiveTab }) => {
  const [newProfilePic, setNewProfilePic] = useState();

  const updateUser = useUpdateUser();

  useEffect(() => {
    if (user?.profilePic) {
      setNewProfilePic(
        `${process.env.REACT_APP_SERVER_URL}${user?.profilePic}`
      );
    }
  }, [user]);

  // update profile pic
  const [updateProfilePic, { data }] = useUpdateProfilePicMutation();

  // capture profile image funciton
  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setNewProfilePic(reader.result);

      if (reader.result) {
        updateProfilePic({
          id: user?._id,
          data: { profilePic: reader.result },
        });
      }
    };
  };

  // update aler
  useEffect(() => {
    if (data?._id) {
      updateUser(data);
      toast.success("Profile Updated Successfully");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="relative inline-block mx-auto">
          <img
            className="h-[120px] w-[120px] rounded-full"
            src={
              newProfilePic
                ? newProfilePic
                : user?.profilePic
                ? `${process.env.REACT_APP_SERVER_URL}${user?.profilePic}`
                : "/img/avt.png"
            }
            alt="avatar"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-2 cursor-pointer right-0 p-2 bg-primary text-white rounded-full"
          >
            <AiFillCamera />
          </label>
          <input
            onChange={captureImage}
            type="file"
            id="profilePic"
            className="hidden"
          />
        </div>
        <div className="text-center mt-3">
          <h3 className="text-xl font-semibold">{`${user?.firstName} ${user?.lastName}`}</h3>
          <span className="text-secondary text-[13px]">{user?.email}</span>
        </div>
      </div>

      <div className="mt-8">
        <ul className="flex flex-col gap-2">
          <li
            className={`transition-all ${
              activeTab === 1
                ? "text-white bg-primary"
                : "text-dark hover:text-white hover:bg-primary"
            } rounded-full text-base font-bold flex items-center gap-2 px-6 py-3 cursor-pointer`}
            onClick={() => setActiveTab(1)}
          >
            <HiOutlineUserCircle
              className={`transition-all font-bold text-2xl ${
                activeTab === 1 ? "text-white" : "text-primary hover:text-white"
              }`}
            />
            <span>User Profile</span>
          </li>
          <li
            className={`transition-all ${
              activeTab === 2
                ? "text-white bg-primary"
                : "text-dark hover:text-white hover:bg-primary"
            } rounded-full text-base font-bold flex items-center gap-2 px-6 py-3 cursor-pointer`}
            onClick={() => setActiveTab(2)}
          >
            <FiShare2
              className={`transition-all font-bold text-2xl ${
                activeTab === 2 ? "text-white" : "text-primary hover:text-white"
              }`}
            />
            <span>Referrals</span>
          </li>
          <li
            className={`transition-all ${
              activeTab === 3
                ? "text-white bg-primary"
                : "text-dark hover:text-white hover:bg-primary"
            } rounded-full text-base font-bold flex items-center gap-2 px-6 py-3 cursor-pointer`}
            onClick={() => setActiveTab(3)}
          >
            <RiMoneyDollarCircleLine
              className={`transition-all font-bold text-2xl ${
                activeTab === 3 ? "text-white" : "text-primary hover:text-white"
              }`}
            />
            <span>Earnings</span>
          </li>
          <li
            className={`transition-all ${
              activeTab === 4
                ? "text-white bg-primary"
                : "text-dark hover:text-white hover:bg-primary"
            } rounded-full text-base font-bold flex items-center gap-2 px-6 py-3 cursor-pointer`}
            onClick={() => setActiveTab(4)}
          >
            <GiRamProfile
              className={`transition-all font-bold text-2xl ${
                activeTab === 4 ? "text-white" : "text-primary hover:text-white"
              }`}
            />
            <span>Expert Profiles</span>
          </li>
          <li
            className={`transition-all ${
              activeTab === 5
                ? "text-white bg-primary"
                : "text-dark hover:text-white hover:bg-primary"
            } rounded-full text-base font-bold flex items-center gap-2 px-6 py-3 cursor-pointer`}
            onClick={() => setActiveTab(5)}
          >
            <RiLock2Line
              className={`transition-all font-bold text-2xl ${
                activeTab === 5 ? "text-white" : "text-primary hover:text-white"
              }`}
            />
            <span>Change Password</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
