import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ImCamera } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../component/admin/AdminLayout";
import { useCreateExpertProfileMutation } from "../../features/expertProfile/expertProfileApi";

const AddExperProfile = () => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // capture profile pic
  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
  };

  // create new expert profile
  const [createExpertProfile, { data: newProfile }] =
    useCreateExpertProfileMutation();

  useEffect(() => {
    if (newProfile?._id) {
      toast.success("Expert profile created successfully");
      navigate("/admin/expert-profiles");
    }
  }, [navigate, newProfile]);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // check validation
    const validatoinErrrors = {};

    if (!name) {
      validatoinErrrors.name = "Expert Name is required!!";
    }

    if (!maximumPrice) {
      validatoinErrrors.maximumPrice = "Expert maximum price is required!!";
    }

    if (!minimumPrice) {
      validatoinErrrors.minimumPrice = "Expert minimum price is required!!";
    }

    if (!profilePic) {
      validatoinErrrors.profilePic = "Expert profile picture is required!!";
    }

    if (Object.keys(validatoinErrrors).length > 0) {
      setErrors(validatoinErrrors);
      return;
    }

    createExpertProfile({
      name,
      maximumPrice,
      minimumPrice,
      profilePic,
      description,
    });
  };
  return (
    <AdminLayout>
      <div className=" bg-white rounded-md mb-10">
        {/* edit form */}
        <div className="py-6 px-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="w-full">
              <label htmlFor="firstName" className="font-bold text-sm">
                Expert Profile Pic
              </label>
              <div>
                <div className="w-28 h-28 relative mt-3 profilePicWrapper inline-block transition-all duration-200">
                  <img
                    className="w-28 h-28 rounded-full"
                    src={profilePic || "/img/avt.png"}
                    alt="avatar"
                  />
                  <label
                    className={`transition-all duration-300 scale-0 w-28 h-28 rounded-full bg-black/70 flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer profilePic"
                  `}
                    htmlFor="profile-pic"
                  >
                    <ImCamera className="text-3xl text-white" />
                  </label>
                </div>

                {errors?.profilePic && (
                  <div>
                    <p className="mt-2 text-red-600">{errors?.profilePic}</p>
                  </div>
                )}
              </div>
              <input
                className="hidden"
                id="profile-pic"
                type="file"
                placeholder="Enter expert name"
                onChange={captureImage}
              />
            </div>

            <div className="w-full">
              <label htmlFor="firstName" className="font-bold text-sm">
                Expert Name*
              </label>
              <input
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border border-br rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                id="firstName"
                type="text"
                placeholder="Enter expert name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {errors?.name && (
                <div>
                  <p className="mt-2 text-red-600">{errors?.name}</p>
                </div>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="maximumPrice" className="font-bold text-sm">
                Expert Maximum Price*
              </label>
              <input
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border border-br rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                id="maximumPrice"
                type="text"
                placeholder="Enter expert maximum price"
                value={maximumPrice}
                onChange={(e) => setMaximumPrice(e.target.value)}
              />
              {errors?.maximumPrice && (
                <div>
                  <p className="mt-2 text-red-600">{errors?.maximumPrice}</p>
                </div>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="minimumPrice" className="font-bold text-sm">
                Expert Minimum Price*
              </label>
              <input
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border border-br rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                id="minimumPrice"
                type="text"
                placeholder="Enter expert minimum price"
                value={minimumPrice}
                onChange={(e) => setMinimumPrice(e.target.value)}
              />
              {errors?.minimumPrice && (
                <div>
                  <p className="mt-2 text-red-600">{errors?.minimumPrice}</p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="shortDescription" className="font-bold text-sm">
                Expert Description
              </label>
              <textarea
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border border-br rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3 h-28"
                id="shortDescription"
                placeholder="Enter expert description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="reset"
                className="flex items-center hover:bg-light px-8 py-2 rounded-[4px] gap-[5px] font-medium transition cursor-pointer border border-br"
              >
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="flex items-center text-white bg-primary px-8 py-2 rounded-[4px] gap-[5px] font-medium transition hover:bg-primary/70 border border-primary"
              >
                <span>Add Expert Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddExperProfile;
