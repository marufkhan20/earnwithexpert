import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import BreadCumb from "../component/BreadCumb";
import Input from "../component/utilities/Input";
import {
  useGetExpertProfilesQuery,
  useHireExpertMutation,
} from "../features/expertProfile/expertProfileApi";
import { useGetUserQuery } from "../features/user/userApi";

const ExpertProfiles = () => {
  const { user: userInfo } = useSelector((state) => state.auth || {});
  const [expertProfiles, setExpertProfiles] = useState([]);
  const [hireBox, setHireBox] = useState({});
  const [errors, setErrors] = useState({});
  const [amount, setAmount] = useState(0);

  // get all expert profiles
  const { data } = useGetExpertProfilesQuery();

  // get user details
  const { data: user } = useGetUserQuery(userInfo?._id);

  useEffect(() => {
    if (data?.length > 0) {
      setExpertProfiles(data);
    }
  }, [data]);

  // amount calculate
  useEffect(() => {
    if (amount && amount > user?.totalBalance) {
      setErrors({
        amount: "Your total balance is less than the amount you paid!!",
      });
    } else if (amount && Number(amount) > hireBox?.maximumPrice) {
      setErrors({
        amount: "Your hire amount is more than the expert's maximum price!!",
      });
    } else if (amount && Number(amount) < hireBox?.minimumPrice) {
      setErrors({
        amount: "Your hire amount is less than the expert's minimum price!!",
      });
    } else {
      setErrors({});
    }
  }, [amount, hireBox, user]);

  // hire new expert
  const [hireExpert, { data: newExpert }] = useHireExpertMutation();

  useEffect(() => {
    if (newExpert?._id) {
      toast.success(
        "New Expert Hire Successfully. Please wait for admin approval."
      );
      setHireBox({});
      setAmount(0);
    }
  }, [newExpert]);

  console.log("user", user);

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (Object.keys(errors)?.length === 0) {
      hireExpert({ amount, expert: hireBox?._id });
    }
  };
  return (
    <main>
      <BreadCumb page="Expert Profiles" />
      <div className="container mx-auto py-24">
        <div className="grid grid-cols-4 gap-8">
          {expertProfiles?.map((profile) => (
            <div className="flex flex-col justify-center items-center border border-br py-4 px-5 rounded-md">
              <img
                src={
                  profile?.profilePic
                    ? `${process.env.REACT_APP_SERVER_URL}${profile?.profilePic}`
                    : "/img/avt.png"
                }
                className="w-32 h-32 rounded-full"
                alt="avatar"
              />
              <h3 className="text-2xl font-bold mt-2 cursor-pointer hover:text-primary">
                {profile?.name}
              </h3>
              <h5 className="mt-2">
                Price: ${`${profile?.minimumPrice}-${profile?.maximumPrice}`}
              </h5>
              <p className="text-center mt-2 text-lg text-secondary">
                {profile?.description}
              </p>
              <button
                className="border border-primary text-primary transition-all inline-block py-2 px-6 hover:bg-primary hover:text-white rounded-md mt-2"
                onClick={() => setHireBox(profile)}
              >
                Hire Me
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* hire expert box */}
      <div
        className={`transition-all duration-300 ${
          hireBox?._id ? "scale-100" : "scale-0"
        } fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/70 flex items-center justify-center`}
      >
        <div className="bg-white py-4 px-5 rounded-xl border border-br w-[500px]">
          <div className="flex items-center justify-between  pb-2 border-b border-br">
            <h2 className="text-xl">Hire Expert</h2>
            <AiOutlineCloseCircle
              onClick={() => setHireBox({})}
              className="text-lg cursor-pointer"
            />
          </div>
          <div className="mt-3">
            <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-4">
                <p>Your Total Balance: ${user?.totalBalance}</p>
                <p>
                  Minimum Price: ${hireBox?.minimumPrice} - Maximum Price: $
                  {hireBox?.maximumPrice}
                </p>
                <div>
                  <label className="text-lg inline-block mb-2" htmlFor="amount">
                    Amount
                  </label>
                  <Input
                    type="number"
                    id="amount"
                    placeholder="Enter Hire Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />

                  {errors?.amount && (
                    <div>
                      <p className="mt-2 text-red-600">{errors?.amount}</p>
                    </div>
                  )}
                </div>
                <div>
                  <button className="py-2 bg-primary block w-full text-white font-medium rounded-md">
                    Hire Expert
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExpertProfiles;
