import React from "react";

const ProfileTitle = ({ heading, subHeading }) => {
  return (
    <div>
      <h2 className="text-[40px] mb-3">{heading}</h2>
      <h4 className="text-2xl">{subHeading}</h4>
    </div>
  );
};

export default ProfileTitle;
