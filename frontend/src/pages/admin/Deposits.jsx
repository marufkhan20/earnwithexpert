/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GiReceiveMoney } from "react-icons/gi";
import AdminLayout from "../../component/admin/AdminLayout";
import {
  useApproveDepositMutation,
  useGetDepositsQuery,
} from "../../features/deposit/depositApi";

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);

  // get all deposits
  const { data } = useGetDepositsQuery();

  useEffect(() => {
    if (data?.length > 0) {
      setDeposits(data);
    }
  }, [data]);

  // approve deposit
  const [approveDeposit, { data: updatedDeposit }] =
    useApproveDepositMutation();

  useEffect(() => {
    if (updatedDeposit?._id && updatedDeposit?.status === "approve") {
      toast.success("Deposits approved successfully");
      const updatedDeposits = [...deposits]?.filter(
        (item) => item?._id !== updatedDeposit?._id
      );
      setDeposits(updatedDeposits);
    }
  }, [updatedDeposit]);

  return (
    <AdminLayout icon={<GiReceiveMoney />} title={"Deposit"}>
      <div className="p-4 rounded-md bg-white mt-5 flex items-center justify-between gap-5">
        <input
          className="bg-transparent border border-br rounded-md py-2 px-4 outline-none focus:ring-1 w-[300px]"
          placeholder="Search user"
          type="text"
        />
      </div>

      <div className="p-5 mt-5 bg-white border border-br rounded-lg w-full">
        <table class="table-auto w-full border">
          <thead className="bg-[#F8FAFC] border border-br text-left box-border">
            <tr>
              <th className="text-sm py-2 px-4 border-r border-br">SL</th>
              <th className="text-sm py-2 px-4 border-r border-br">Profile</th>
              <th className="text-sm py-2 px-4 border-r border-br">Name</th>
              <th className="text-sm py-2 px-4 border-r border-br">Status</th>
              <th className="text-sm py-2 px-4 border-r border-br">
                Deposit Info
              </th>
              <th className="text-sm py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deposits
              ?.filter((item) => item.status === "pending")
              .map((deposit, idx) => (
                <tr className="border-b border-br hover:bg-[#F1F5F9]">
                  <td className="py-4 px-4 border-r border-br">{idx + 1}</td>
                  <td className="py-4 px-4 border-r border-br">
                    <img
                      className="w-20 h-20 rounded-full"
                      src={
                        deposit?.user?.profilePic
                          ? `${process.env.REACT_APP_SERVER_URL}${deposit?.user?.profilePic}`
                          : "/img/avt.png"
                      }
                      alt="avatar"
                    />
                  </td>
                  <td className="py-4 px-4 border-r border-br">{`${deposit?.user?.firstName} ${deposit?.user?.lastName}`}</td>
                  <td className="py-4 px-4 border-r border-br">
                    {deposit?.status}
                  </td>
                  <td className="py-4 px-4 border-r border-br">
                    <span>Amount: ${deposit?.amount}</span>
                    <br />
                    <button className="inline-block text-white py-1 px-3 bg-green-700 rounded-md mt-2 font-medium">
                      See Screenshot
                    </button>
                  </td>
                  <td className="py-4 px-4 border-r border-br">
                    <div className="flex items-center gap-5">
                      <button
                        className="bg-primary text-white block py-2 px-4 rounded transition hover:bg-primary/60"
                        onClick={() => approveDeposit(deposit?._id)}
                      >
                        Accept
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

export default Deposits;
