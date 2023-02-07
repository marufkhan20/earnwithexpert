import React from "react";
import Input from "../utilities/Input";
import ProfileTitle from "./ProfileTitle";

const ChangePassword = () => {
  return (
    <div>
      <ProfileTitle
        heading="Change Password"
        subHeading="New Passworld
"
      />

      <div className="mt-8 w-[70%]">
        <form action="">
          <div className="flex flex-col gap-6">
            <div>
              <label
                className="text-sm text-secondary inline-block mb-2"
                htmlFor="oldPassword"
              >
                Old Password*
              </label>
              <Input
                placeholder="Old Password"
                type="text"
                id="oldPassword"
                value="123456789"
              />
            </div>
            <div className="flex items-center w-full gap-5">
              <div className="w-full">
                <label
                  className="text-sm text-secondary inline-block mb-2"
                  htmlFor="newPassword"
                >
                  New Password*
                </label>
                <Input
                  type="text"
                  id="newPassword"
                  placeholder="New Password"
                />
              </div>
              <div className="w-full">
                <label
                  className="text-sm text-secondary inline-block mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password*
                </label>
                <Input
                  type="text"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div>
              <button className="inline-block outline-none py-3 px-12 rounded-full bg-primary text-white font-medium transition-all hover:bg-primary/80">
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
