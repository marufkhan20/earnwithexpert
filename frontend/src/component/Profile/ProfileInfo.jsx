import React, { useEffect, useState } from "react";
import Input from "../utilities/Input";
import Select from "../utilities/Select";
import ProfileTitle from "./ProfileTitle";

const ProfileInfo = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [trcCode, setTrcCode] = useState("");
  // const [errors, setErrors] = useState({});

  // set user data in state
  useEffect(() => {
    const { firstName, lastName, phone, trcCode, email, gender, nationalId } =
      user || {};

    if (user?._id) {
      setFirstName(firstName);
      setLastName(lastName);
      setPhone(phone);
      setTrcCode(trcCode);
      setEmail(email);
      setGender(gender);
      setNationalId(nationalId);
    }
  }, [user]);
  return (
    <div>
      <ProfileTitle heading="User Profile" subHeading="Infomation" />
      <form action="" className="mt-11">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between gap-6">
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-6">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled
            />
          </div>
          <div className="flex items-center justify-between gap-6">
            <Input
              type="text"
              value={trcCode}
              onChange={(e) => setTrcCode(e.target.value)}
            />
            <Select>
              <option value="">Select Gender</option>
              <option selected={gender === "male"} value="male">
                Male
              </option>
              <option selected={gender === "female"} value="female">
                Female
              </option>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-6">
            <Input
              type="text"
              value={nationalId}
              disabled
              onChange={(e) => setNationalId(e.target.value)}
            />
          </div>
          <div>
            <button className="inline-block py-3 px-11 bg-primary text-white text-base font-semibold rounded-full outline-none">
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
