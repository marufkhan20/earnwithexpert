import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetAllHireExpertsByUserQuery } from "../../features/expertProfile/expertProfileApi";
import ProfileTitle from "./ProfileTitle";

const ExpertProfiles = () => {
  const [sendReq, setSendReq] = useState(false);
  const { profileId } = useParams();

  const { data: experts } = useGetAllHireExpertsByUserQuery(profileId, {
    skip: !sendReq,
  });

  useEffect(() => {
    if (profileId) {
      setSendReq(true);
    }
  }, [profileId]);
  console.log(experts);
  return (
    <div>
      <ProfileTitle heading="Expert Profiles" subHeading="Hire Experts" />

      <div>
        <Link
          className="mt-5 inline-block py-2 px-6 rounded-full bg-primary text-white"
          to="/expert-profiles"
        >
          Hire New Expert
        </Link>
      </div>

      <div className="mt-8 w-[70%] flex flex-col gap-5">
        {experts?.map((expert) => (
          <div className="flex items-center justify-between gap-5 border border-br rounded-xl py-2 px-4">
            <div className="flex items-center gap-5">
              <img
                className="w-20 h-20 rounded-full"
                src={`${process.env.REACT_APP_SERVER_URL}${expert?.expertProfile?.profilePic}`}
                alt="avatar"
              />
              <h3>{expert?.expertProfile?.name}</h3>
            </div>
            {expert?.status === "pending" && (
              <span className="block py-1 px-4 text-white rounded-full bg-green-600 text-sm">
                PENDING
              </span>
            )}

            {expert?.status === "approved" && (
              <span className="block py-1 px-4 text-white rounded-full bg-primary text-sm">
                APPROVED
              </span>
            )}

            {expert?.status === "cancelled" && (
              <span className="block py-1 px-4 text-white rounded-full bg-red-600 text-sm">
                CANCELLED
              </span>
            )}
            <span>${expert?.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertProfiles;
