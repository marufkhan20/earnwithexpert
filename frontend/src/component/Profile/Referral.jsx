import React from "react";
import Input from "../utilities/Input";

const Referral = ({ user }) => {
  return (
    <div>
      <h4 className="text-2xl">Total rewards</h4>
      <h2 className="text-[40px] mt-3 mb-2">
        ${user?.referralBalance} <span className="text-[#58bd7d]">USD</span>
      </h2>
      <p className="text-base text-secondary">
        You're Earning 10% Of The Trading Fees Your Referrals Pay. Learn More
      </p>

      <div className="p-[30px] bg-gray rounded-3xl mt-11 w-[60%]">
        <h3 className="text-2xl mb-5">Invite friends to earn 10%</h3>

        {user?.totalBalance >= 100 ? (
          <div className="flex items-center gap-5 w-full">
            <div className="w-full">
              <label
                className="text-base text-dark mb-3 font-bold inline-block"
                htmlFor="code"
              >
                Referral Code
              </label>
              <Input
                id="code"
                classes="font-bold text-base bg-white rounded-xl"
                value={user?._id}
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-red-500">
              You need to deposit a minimum of $100 to get the referral ID.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Referral;
