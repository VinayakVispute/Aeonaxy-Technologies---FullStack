import React, { useState } from "react";
import Logo from "../assets/DribbbleIcon.png";
import { useForm } from "react-hook-form";
import { useOnBoardingContext } from "../contexts/Onboarding";
import { useNavigate } from "react-router-dom";
import { RiAlertFill } from "react-icons/ri";
import { toast } from "react-toastify";

const Welcome = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showDefaultAvatars, setShowDefaultAvatars] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUserData } = useOnBoardingContext();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    try {
      if (!avatar) {
        toast.error("Profile Photo is required");
        return;
      }
      setUserData((prevData) => ({
        ...prevData,
        avatar: avatar,
        location: data.location,
      }));

      navigate("/?page=interest");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again");
      navigate("/");
      return;
    }
  };

  const handleAvatarSelection = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setShowDefaultAvatars(false); // Hide default avatars after selection
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between pt-10 px-4 md:px-14">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-auto h-8" />
        </div>
      </nav>
      <main className="flex items-center justify-center w-full">
        <div className="p-4 md:p-[40px] flex-grow max-w-3xl">
          <header className="mb-6 mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome! Let's create your profile
            </h1>
            <p className="text-gray-600 text-base">
              Let others get to know you better!
            </p>
          </header>
          <section className="mb-6">
            <div className="mb-8 flex flex-col justify-center items-center md:items-start gap-y-4">
              <label className="text-xl md:text-2xl mb-2 font-bold flex items-baseline gap-x-1">
                {errors.avatar && (
                  <RiAlertFill className="pr-1 h-4 w-auto text-yellow-600" />
                )}{" "}
                Add an avatar
              </label>
              <div className="flex flex-col items-center w-full gap-y-[2rem] justify-center md:flex-row md:justify-start gap-x-6">
                <label
                  htmlFor="avatar"
                  className={`w-32 h-32 ${
                    !selectedAvatar &&
                    "border-4 border-dashed border-gray-300 hover:border-pink-500"
                  } rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedAvatar ? (
                    <img
                      src={selectedAvatar}
                      alt="Selected Avatar"
                      className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 hover:border-pink-500"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                      <circle cx={12} cy={13} r={3} />
                    </svg>
                  )}
                </label>
                <input
                  type="file"
                  id="avatar"
                  {...register("avatar", {
                    required: {
                      value: true,
                      message: "Profile Photo is required",
                    },
                  })}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button>
                  <label
                    htmlFor="avatar"
                    className="min-w-32 inline-flex items-center justify-center
              whitespace-nowrap text-sm font-medium ring-offset-background
              transition-colors focus-visible:outline-none
              disabled:pointer-events-none disabled:opacity-50
              hover:bg-pink-800/90 h-10 bg-pink-500 text-white py-2 px-4
              rounded mb-2 cursor-pointer"
                  >
                    Choose image
                  </label>
                </button>
              </div>
              {errors.avatar && (
                <p className="text-sm text-red-500 py-1">
                  Profile Photo is required
                </p>
              )}
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer focus:outline-none focus-visible:outline-none"
                  onClick={() =>
                    setShowDefaultAvatars((prevState) => !prevState)
                  }
                >
                  <span className="flex items-center mr-1 text-[#9e9ea7] ">
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`fill-current icon-16 focus:outline-none ${
                        showDefaultAvatars && "rotate-90"
                      }`}
                    >
                      <path d="M4.47 1.154a.814.814 0 00-1.149 0 .806.806 0 000 1.143l3.636 3.62-3.636 3.62a.806.806 0 000 1.143.814.814 0 001.148 0L8.667 6.5a.817.817 0 00.224-.381.806.806 0 00-.228-.79L4.47 1.155z" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium">
                    Or choose one of our defaults
                  </span>
                </div>
                {errors.avatar && (
                  <p className="text-sm text-red-500 py-1">
                    Profile Photo is required
                  </p>
                )}
                {showDefaultAvatars && (
                  <div className="flex justify-center md:justify-start items-center gap-x-4 my-2">
                    {showDefaultAvatars && (
                      <div className="flex justify-start items-center gap-x-4 my-2">
                        {loading && <div>Loading...</div>}
                        <div>
                          <img
                            className="w-10 h-10 rounded-full cursor-pointer"
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            alt="Medium avatar"
                            onLoad={() => setLoading(false)}
                            onClick={() =>
                              handleAvatarSelection(
                                "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                              )
                            }
                          />
                        </div>
                        <div>
                          <img
                            className="w-10 h-10 rounded-full cursor-pointer"
                            src=" https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                            alt="Medium avatar"
                            onLoadStart={() => setLoading(true)}
                            onLoad={() => setLoading(false)}
                            onClick={() =>
                              handleAvatarSelection(
                                "https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                              )
                            }
                          />
                        </div>
                        <div>
                          <img
                            className="w-10 h-10 rounded-full cursor-pointer"
                            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                            alt="Medium avatar"
                            onLoadStart={() => setLoading(true)}
                            onLoad={() => setLoading(false)}
                            onClick={() =>
                              handleAvatarSelection(
                                "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                              )
                            }
                          />
                        </div>
                        <div>
                          <img
                            className="w-10 h-10 rounded-full cursor-pointer"
                            src=" https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                            alt="Medium avatar"
                            onLoadStart={() => setLoading(true)}
                            onLoad={() => setLoading(false)}
                            onClick={() =>
                              handleAvatarSelection(
                                "https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                              )
                            }
                          />
                        </div>
                        <div>
                          <img
                            className="w-10 h-10 rounded-full cursor-pointer"
                            src=" https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Medium avatar"
                            onLoadStart={() => setLoading(true)}
                            onLoad={() => setLoading(false)}
                            onClick={() =>
                              handleAvatarSelection(
                                "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
          <form onSubmit={handleSubmit(onSubmit)} noValidates>
            <div>
              <div>
                <label
                  htmlFor="location"
                  className="flex items-baseline gap-x-2 text-lg md:text-xl font-semibold mb-4"
                >
                  {errors.location && (
                    <RiAlertFill className="pr-1 h-4 w-auto text-yellow-600" />
                  )}{" "}
                  Add your location
                </label>

                <input
                  type="text"
                  {...register("location", {
                    required: {
                      value: true,
                      message: "Location is required",
                    },
                  })}
                  className="peer py-3 my-3 pe-0 ps-3 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent  text-sm focus-visible:outline-none focus:bg-gray-50 focus:border-t-transparent focus:border-x-transparent focus:border-b-pink-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none "
                  placeholder="Enter your location..."
                />
                {errors.location && (
                  <p className="text-sm text-red-500 py-1">
                    {errors.location.message || "Location is required"}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 bg-pink-500 text-white py-2 px-8 rounded">
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Welcome;
