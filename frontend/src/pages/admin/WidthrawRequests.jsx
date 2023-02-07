/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { TbCash } from "react-icons/tb";
import AdminLayout from "../../component/admin/AdminLayout";
import {
  useApproveWidthrawMutation,
  useGetWidthrawsQuery,
} from "../../features/widthraw/widthrawApi";

const WidthrawRequests = () => {
  const [widthraws, setWidthraws] = useState([]);

  // get all widthraws
  const { data } = useGetWidthrawsQuery();

  useEffect(() => {
    if (data?.length > 0) {
      setWidthraws(data);
    }
  }, [data]);

  // approve widthraw
  const [approveWidthraw, { data: approvedWidthraw }] =
    useApproveWidthrawMutation();

  useEffect(() => {
    if (approvedWidthraw?._id) {
      toast.success("Widthraw was successfully approved");
      const updatedData = [...widthraws]?.filter(
        (item) => item?._id !== approvedWidthraw?._id
      );

      setWidthraws(updatedData);
    }
  }, [approvedWidthraw]);
  return (
    <AdminLayout icon={<TbCash />} title={"Widthraw Requests"}>
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
              <th className="text-sm py-2 px-4 border-r border-br">Email</th>
              <th className="text-sm py-2 px-4 border-r border-br">TrcCode</th>
              <th className="text-sm py-2 px-4 border-r border-br">
                Widthraw Amount
              </th>
              <th className="text-sm py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {widthraws
              ?.filter((item) => item.status === "pending")
              ?.map((widthraw, idx) => (
                <tr className="border-b border-br hover:bg-[#F1F5F9]">
                  <td className="py-4 px-4 border-r border-br">{idx + 1}</td>
                  <td className="py-4 px-4 border-r border-br">
                    <img
                      className="w-20 h-20 rounded-full"
                      src={widthraw?.user?.profilePic || "/img/avt.png"}
                      alt="avatar"
                    />
                  </td>
                  <td className="py-4 px-4 border-r border-br">{`${widthraw?.user?.firstName} ${widthraw?.user?.lastName}`}</td>
                  <td className="py-4 px-4 border-r border-br">
                    {widthraw?.user?.email}
                  </td>
                  <td className="py-4 px-4 border-r border-br">
                    {widthraw?.trcCode}
                  </td>
                  <td className="py-4 px-4 border-r border-br">
                    ${widthraw?.amount}
                  </td>
                  <td className="py-4 px-4 border-r border-br">
                    <div className="flex items-center gap-5">
                      <button
                        className="bg-primary text-white block py-2 px-4 rounded transition hover:bg-primary/60"
                        onClick={() => approveWidthraw(widthraw?._id)}
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

export default WidthrawRequests;
