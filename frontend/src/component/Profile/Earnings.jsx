import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useCreateDepositMutation } from "../../features/deposit/depositApi";
import { useCreateWidthrawMutation } from "../../features/widthraw/widthrawApi";
import Input from "../utilities/Input";

const Earnings = ({ user }) => {
  const [depositBox, setDepositBox] = useState(false);
  const [widthrawBox, setWidthrawBox] = useState(false);
  const [amount, setAmount] = useState(0);
  const [screenshot, setScreenshot] = useState("");
  const [widthrawAmount, setWidthrawAmount] = useState(0);
  const [errors, setErrors] = useState({});

  console.log("user", user);

  // capture profile pic
  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setScreenshot(reader.result);
    };
  };

  // create new deposit
  const [createDeposit, { data: newDeposit }] = useCreateDepositMutation();

  useEffect(() => {
    if (newDeposit?._id) {
      toast.success("Deposit added successfully");
      setAmount(0);
      setScreenshot("");
      setDepositBox(false);
    }
  }, [newDeposit]);

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // check validation
    const validationErrors = {};

    if (!amount) {
      validationErrors.amount = "Deposit Amount is required!!";
    }

    if (!screenshot) {
      validationErrors.screenshot = "Deposit Screenshot is required!!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    createDeposit({ amount, screenshot });
  };

  // widthraw amount
  useEffect(() => {
    if (widthrawAmount > user?.totalBalance) {
      setErrors({ widthrawAmount: "Your Available Balance is too low!!" });
    }
  }, [user, widthrawAmount]);

  const [createWidthraw, { data: newWidthraw }] = useCreateWidthrawMutation();

  useEffect(() => {
    if (newWidthraw?._id) {
      toast.success("Widthraw is successfully send.");
      setWidthrawAmount("");
      setWidthrawBox(false);
    }
  }, [newWidthraw]);

  // submitWidthrawHandler
  const submitWidthrawHandler = (e) => {
    e.preventDefault();

    if (Object.keys(errors)?.length === 0) {
      createWidthraw({ amount: widthrawAmount });
    }
  };

  return (
    <div>
      <div className="bg-gray py-3 px-4 rounded-2xl border border-br flex items-center justify-between">
        <div>
          <h2 className="text-[24px]">Earnings</h2>
        </div>
        <div className="flex items-center gap-5">
          <button className="border border-transparent py-[11px] px-12 font-medium bg-primary text-white rounded-full inline-block">
            Daily
          </button>
          <button className="border border-primary text-primary transition-all py-[11px] px-12 font-medium hover:bg-primary hover:text-white rounded-full inline-block">
            Weekly
          </button>
          <button className="border border-primary text-primary transition-all py-[11px] px-12 font-medium hover:bg-primary hover:text-white rounded-full inline-block">
            Monthly
          </button>
        </div>
      </div>

      {(newDeposit?._id ||
        user?.deposits[user?.deposits?.length - 1]?.status === "pending") && (
        <div className="mt-5 font-semibold text-blue-600">
          <p>
            Your Deposit Successfully Submitted. Please waiting for admin
            approval.
          </p>
        </div>
      )}

      {(newWidthraw?._id ||
        user?.widthraws[user?.widthraws?.length - 1]?.status === "pending") && (
        <div className="mt-5 font-semibold text-blue-600">
          <p>
            Your Widthraw Successfully Submitted. Please waiting for admin
            approval.
          </p>
        </div>
      )}

      <div className="flex justify-between gap-5 mt-8">
        <div className="w-[50%] p-[30px] border border-br rounded-2xl">
          <h2 className="text-[20px] mb-2">USD</h2>
          <div className="flex items-center gap-2">
            <span className="text-secondary text-base">Total Balance</span>
            <h3 className="text-xl">{user?.totalBalance || "00.0"} USD</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary text-base">Deposit Balance</span>
            <h3 className="text-xl">{user?.depositAmount || "00.0"} USD</h3>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <button
              className="py-2 px-6 rounded-lg bg-primary text-white"
              onClick={() => setWidthrawBox(true)}
            >
              Widthraw
            </button>
            <button
              className="py-2 px-6 rounded-lg bg-primary text-white"
              onClick={() => setDepositBox(true)}
            >
              Deposit
            </button>
          </div>
        </div>
        <div className="w-[50%] flex flex-col gap-5">
          <div className="flex justify-between items-start text-right py-[10px] px-4 border border-br rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
              <h3 className="text-lg">Referral's Earning</h3>
            </div>
            <div>
              <h3 className="text-lg">{user?.referralBalance || "00.0"}</h3>
              <span className="text-secondary">
                ${user?.referralBalance || "00.0"}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-start text-right py-[10px] px-4 border border-br rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
              <h3 className="text-lg">Trade Earning</h3>
            </div>
            <div>
              <h3 className="text-lg">${user?.tradingBalance || "00.0"}</h3>
              <span className="text-secondary">
                ${user?.tradingBalance || "00.0"}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-start text-right py-[10px] px-4 border border-br rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
              <h3 className="text-lg">Available Balance</h3>
            </div>
            <div>
              <h3 className="text-lg">{user?.totalBalance || "00.0"}</h3>
              <span className="text-secondary">
                ${user?.totalBalance || "00.0"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* deposit modal */}
      <div
        className={`transition-all duration-300 ${
          depositBox ? "scale-100" : "scale-0"
        } fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/70 flex items-center justify-center`}
      >
        <div className="bg-white py-4 px-5 rounded-xl border border-br w-[500px]">
          <div className="flex items-center justify-between  pb-2 border-b border-br">
            <h2 className="text-xl">Deposit Now</h2>
            <AiOutlineCloseCircle
              onClick={() => setDepositBox(false)}
              className="text-lg cursor-pointer"
            />
          </div>
          <div className="mt-3">
            <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-lg inline-block mb-2" htmlFor="amount">
                    Amount
                  </label>
                  <Input
                    type="number"
                    id="amount"
                    placeholder="Enter Deposit Amount"
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
                  <label className="text-lg inline-block mb-2" htmlFor="code">
                    Trc20 Code
                  </label>
                  <Input
                    disabled
                    type="text"
                    id="code"
                    value="250250"
                    placeholder="Enter Trc20 Code"
                  />
                </div>
                <div>
                  <label className="text-lg inline-block mb-2" htmlFor="file">
                    Screenshot
                  </label>
                  <label
                    className="block w-full py-2 bg-gray text-center text-dark border border-br font-medium rounded-md cursor-pointer transition-all"
                    htmlFor="file"
                  >
                    Upload Screenshot
                  </label>
                  <input
                    onChange={captureImage}
                    type="file"
                    id="file"
                    className="hidden"
                  />
                  {errors?.screenshot && (
                    <div>
                      <p className="mt-2 text-red-600">{errors?.screenshot}</p>
                    </div>
                  )}
                </div>
                {screenshot && (
                  <div className="text-center">
                    <img
                      className="mx-auto"
                      src={screenshot}
                      alt="screenshot"
                    />
                  </div>
                )}
                <div>
                  <button className="py-2 bg-primary block w-full text-white font-medium rounded-md">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* widthraw modal */}
      <div
        className={`transition-all duration-300 ${
          widthrawBox ? "scale-100" : "scale-0"
        } fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/70 flex items-center justify-center`}
      >
        <div className="bg-white py-4 px-5 rounded-xl border border-br w-[500px]">
          <div className="flex items-center justify-between  pb-2 border-b border-br">
            <h2 className="text-xl">Widthraw</h2>
            <AiOutlineCloseCircle
              onClick={() => setWidthrawBox(false)}
              className="text-lg cursor-pointer"
            />
          </div>
          <div className="mt-3">
            <form onSubmit={submitWidthrawHandler}>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-lg inline-block mb-2" htmlFor="amount">
                    Amount
                  </label>
                  <Input
                    type="number"
                    id="amount"
                    placeholder="Enter Deposit Amount"
                    value={widthrawAmount}
                    onChange={(e) => setWidthrawAmount(e.target.value)}
                  />

                  {errors?.widthrawAmount && (
                    <div>
                      <p className="mt-2 text-red-600">
                        {errors?.widthrawAmount}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <button className="py-2 bg-primary block w-full text-white font-medium rounded-md">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
