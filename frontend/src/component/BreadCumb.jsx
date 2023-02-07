import React from "react";
import { Link } from "react-router-dom";

const BreadCumb = ({ page }) => {
  return (
    <div className="bg-gray py-14">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-[40px]">{page}</h2>
          <ul className="flex items-center gap-2">
            <li className="text-lg text-[#777e90] transition-all hover:text-primary">
              <Link to="/">Home</Link>
            </li>
            <li className="text-lg text-[#777e90]">/</li>
            <li className="text-lg text-[#777e90]">{page}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BreadCumb;
