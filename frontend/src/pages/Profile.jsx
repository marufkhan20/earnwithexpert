import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BreadCumb from "../component/BreadCumb";
import ChangePassword from "../component/Profile/ChangePassword";
import Earnings from "../component/Profile/Earnings";
import ExpertProfiles from "../component/Profile/ExpertProfiles";
import ProfileInfo from "../component/Profile/ProfileInfo";
import Referral from "../component/Profile/Referral";
import Sidebar from "../component/Profile/Sidebar";
import { useGetUserQuery } from "../features/user/userApi";

const tabs = {
  1: ProfileInfo,
  2: Referral,
  3: Earnings,
  4: ExpertProfiles,
  5: ChangePassword,
};

const Profile = () => {
  const { user: userInfo } = useSelector((state) => state.auth || {});
  const [activeTab, setActiveTab] = useState(1);
  const Tab = tabs[activeTab];

  const navigate = useNavigate();

  const { profileId } = useParams();

  useEffect(() => {
    if (userInfo?._id !== profileId && userInfo?.role !== "admin") {
      navigate("/");
      toast.error("You are not allowed to another profile!");
    }
  }, [navigate, profileId, userInfo]);

  // get user from server
  const { data: user } = useGetUserQuery(profileId);
  return (
    <main>
      <BreadCumb page="Profile" />
      <div className="container mx-auto flex justify-between gap-16 py-[100px]">
        <div className="w-[18%]">
          <Sidebar
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="w-[80%] pl-[70px] border-l border-br">
          <Tab user={user} />
        </div>
      </div>
    </main>
  );
};

export default Profile;
