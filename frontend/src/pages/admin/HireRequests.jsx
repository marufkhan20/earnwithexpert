/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiRectangleGroup } from "react-icons/hi2";
import { Link } from "react-router-dom";
import AdminLayout from "../../component/admin/AdminLayout";
import {
  useGetAllHireExpertsQuery,
  useUpdateHireExpertStatusMutation,
} from "../../features/expertProfile/expertProfileApi";

const HireRequests = () => {
  const [hireExpers, setHireExpers] = useState([]);

  // get all hire experts
  const { data } = useGetAllHireExpertsQuery();
  useEffect(() => {
    if (data?.length > 0) {
      setHireExpers(data);
    }
  }, [data]);

  // update hire expert status
  const [updateHireExpertStatus, { data: updatedExpert }] =
    useUpdateHireExpertStatusMutation();

  useEffect(() => {
    if (updatedExpert?._id) {
      toast.success("Expert Status updated successfully");

      const updatedExperts = [...hireExpers].map((item) => {
        if (item?._id === updatedExpert?._id) {
          return updatedExpert;
        } else {
          return item;
        }
      });

      setHireExpers(updatedExperts);
    }
  }, [updatedExpert]);

  return (
    <AdminLayout icon={<HiRectangleGroup />} title={"Hire Requests"}>
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
              <th className="text-sm py-2 px-4 border-r border-br">
                Expert Profile
              </th>
              <th className="text-sm py-2 px-4 border-r border-br">
                Expert Name
              </th>
              <th className="text-sm py-2 px-4 border-r border-br">
                User Email
              </th>
              <th className="text-sm py-2 px-4 border-r border-br">
                Hire Price
              </th>
              <th className="text-sm py-2 px-4 border-r border-br">Status</th>
              <th className="text-sm py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hireExpers?.length === 0 && (
              <p className="my-2 ml-5">No Hire Expert Found!!</p>
            )}

            {hireExpers?.map((expert, idx) => (
              <tr className="border-b border-br hover:bg-[#F1F5F9]">
                <td className="py-4 px-4 border-r border-br">{idx + 1}</td>
                <td className="py-4 px-4 border-r border-br">
                  {console.log(expert)}
                  <img
                    className="w-20 h-20 rounded-full"
                    src={
                      expert?.expertProfile?.profilePic
                        ? `${process.env.REACT_APP_SERVER_URL}${expert?.expertProfile?.profilePic}`
                        : "/img/avt.png"
                    }
                    alt="avatar"
                  />
                </td>
                <td className="py-4 px-4 border-r border-br">
                  {expert?.expertProfile?.name}
                </td>
                <td className="py-4 px-4 border-r border-br">
                  {expert?.user?.email}
                </td>
                <td className="py-4 px-4 border-r border-br">
                  {expert?.status}
                </td>
                <td className="py-4 px-4 border-r border-br">
                  {expert?.price}
                </td>
                <td className="py-4 px-4 border-r border-br">
                  <div className="flex items-center gap-5">
                    {expert?.status !== "approved" && (
                      <button
                        className="bg-green-700 text-white block py-2 px-4 rounded transition hover:bg-green-700/60"
                        onClick={() =>
                          updateHireExpertStatus({
                            id: expert?._id,
                            data: { status: "approved" },
                          })
                        }
                      >
                        Approve
                      </button>
                    )}

                    {expert?.status !== "cancelled" && (
                      <button
                        className="bg-red-700 text-white block py-2 px-4 rounded transition hover:bg-red-700/60"
                        onClick={() =>
                          updateHireExpertStatus({
                            id: expert?._id,
                            data: { status: "cancelled" },
                          })
                        }
                      >
                        Reject
                      </button>
                    )}
                    <Link
                      to={`/profile/${expert?.user?._id}`}
                      className="bg-primary text-white block py-2 px-4 rounded transition hover:bg-primary/60"
                    >
                      View User Profile
                    </Link>
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

export default HireRequests;
