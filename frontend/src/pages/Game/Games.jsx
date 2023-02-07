import React, { useState } from "react";
import { useSelector } from "react-redux";
import EnterGame from "../../component/GameScreen/EnterGame";
import PlayGame from "../../component/GameScreen/PlayGame";
import { useGetUserQuery } from "../../features/user/userApi";

const tabs = {
  1: EnterGame,
  2: PlayGame,
};

const Games = ({ playGame }) => {
  const { user: userInfo } = useSelector((state) => state.auth || {});
  const [amount, setAmount] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const Tab = tabs[activeTab];

  // get user from server
  const { data: user } = useGetUserQuery(userInfo?._id);
  return (
    <div
      className={`transition-all duration-300 ${
        playGame ? "scale-100" : "scale-0"
      } fixed top-0 left-0 right-0 bottom-0 bg-black/90 w-full h-full z-50 flex items-center justify-center`}
    >
      <Tab
        user={user}
        amount={amount}
        setAmount={setAmount}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Games;
