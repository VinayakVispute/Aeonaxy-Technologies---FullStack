import { useState } from "react";
import Logo from "../assets/DribbbleIcon.png";
import axios from "axios";
import { useOnBoardingContext } from "../contexts/Onboarding";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";

const Selection = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { userData, setUserData } = useOnBoardingContext();
  const navigate = useNavigate();
  const handleSelectOption = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };

  const handleSubmit = async () => {
    // Check if any required field is empty
    if (
      !userData.name ||
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.location ||
      !userData.avatar ||
      !selectedOption
    ) {
      toast.error("Please fill all fields before proceeding.", {
        autoClose: 5000,
      });
      return navigate("/");
    }

    // Proceed with form submission
    setUserData((prevData) => ({ ...prevData, purpose: selectedOption }));
    try {
      console.log("User data", userData, selectedOption);
      // Display loading toast
      toast.loading("Registering user...", {
        toastId: "registering-user",
      });
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("location", userData.location);
      formData.append("avatar", userData.avatar);
      formData.append("purpose", selectedOption);
      const response = await axios.post(
        "http://localhost:8000/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (!response?.data?.success) {
        console.log(response?.data?.message);
        // Update toast with error message
        toast.update("registering-user", {
          render:
            response?.data?.message || "Registration failed! Please try again.",
          type: "warning",
          isLoading: false,
          autoClose: 5000,
        });
        return;
      }

      // Update toast with success message
      toast.update("registering-user", {
        render:
          "Successfully registered! An email has been sent for email verification.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      // Navigate to confirmation page
      return navigate("/?page=confirm");
    } catch (error) {
      console.log("Error registering user:", error.message);
      // Update toast with error message
      return toast.update("registering-user", {
        render: "Registration failed! Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <img
            src={Logo}
            className="text-pink-500 text-3xl font-bold h-12 w-auto"
          />
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-center mb-4">
          What brings you to Pibbler?
        </h1>
        <p className="text-center text-lg mb-20">
          Select the options that best describe you. Don't worry, you can
          explore other options later.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-16 ">
          <div className="flex flex-col items-center">
            <div
              className={`relative bg-gray-200 min-h-[300px] max-w-[400px] rounded-lg transition-transform transition-border duration-500 cursor-pointer ${
                selectedOption === "Designer"
                  ? "transform -translate-y-4 border-2 border-pink-500"
                  : "blurBorder"
              }`}
              onClick={() => handleSelectOption("Designer")}
            >
              <img
                src="https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/fmlynnsyxqkbe9t6ppxh"
                alt="Designer looking to share work"
                className={`relative mb-4 p-4 rounded-lg transition-transform duration-500  w-auto ${
                  selectedOption === "Designer"
                    ? "transform -translate-y-4 -top-[5rem] max-h-[250px]"
                    : ""
                }`}
                style={{
                  aspectRatio: "400 / 400",
                  objectFit: "cover",
                }}
              />
              <p
                className={`m-2 text-center absolute top-[9.5rem] text-sm transition-opacity transition-max-h   ${
                  selectedOption === "Designer"
                    ? "max-h-[100px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                Find the perfect addition to your team. Browse through our
                curated selection of talented designers ready to bring your
                vision to life.
                <TiTick className="mx-auto h-8 w-8 mt-4 text-white bg-pink-600 rounded-full" />
              </p>
            </div>
            <p className="text-center font-medium pt-4">
              I'm a designer looking to share my work
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`relative bg-gray-200 min-h-[300px] max-w-[400px] rounded-lg transition-transform transition-border duration-500 cursor-pointer ${
                selectedOption === "Hiring"
                  ? "transform -translate-y-4 border-2 border-pink-500"
                  : "blurBorder"
              }`}
              onClick={() => handleSelectOption("Hiring")}
            >
              <img
                src="https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/keaqtmvzkwiueyvvje5w"
                alt="Looking to hire a designer"
                className={`relative mb-4 p-4 rounded-lg transition-transform duration-500 w-auto ${
                  selectedOption === "Hiring"
                    ? "transform -translate-y-4 -top-[5rem] max-h-[250px]"
                    : ""
                }`}
                style={{
                  aspectRatio: "400 / 400",
                  objectFit: "cover",
                }}
              />
              <p
                className={`m-2 text-center absolute top-[9.5rem] text-sm transition-opacity transition-max-h  ${
                  selectedOption === "Hiring"
                    ? "max-h-[100px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                Find the perfect addition to your team. Browse through our
                curated selection of talented designers ready to bring your
                vision to life.
                <TiTick className="mx-auto h-8 w-8 mt-4 text-white bg-pink-600 rounded-full" />
              </p>
            </div>
            <p className="text-center font-medium pt-4">
              I'm looking to hire a designer
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`relative bg-gray-200 min-h-[300px] max-w-[400px] rounded-lg transition-transform transition-border duration-500 cursor-pointer ${
                selectedOption === "Inspiration"
                  ? "transform -translate-y-4 border-2 border-pink-500"
                  : "blurBorder"
              }`}
              onClick={() => handleSelectOption("Inspiration")}
            >
              <img
                src="https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/fpjcf4iq0kuiucdxulpa"
                alt="Looking for design inspiration"
                className={`relative mb-4 p-4 rounded-lg transition-transform duration-500 ${
                  selectedOption === "Inspiration"
                    ? "transform -translate-y-4 -top-[5rem] max-h-[250px]"
                    : ""
                }`}
                style={{
                  aspectRatio: "400 / 400",
                  objectFit: "cover",
                }}
              />
              <p
                className={`m-2 text-center absolute top-[9.5rem] text-sm transition-opacity transition-max-h  ${
                  selectedOption === "Inspiration"
                    ? "max-h-[100px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                With over 7 million shots from a visit community of designers.
                Pribble is the leading source for design inspiration.
                <TiTick className="mx-auto h-8 w-8 mt-4 text-white bg-pink-600 rounded-full" />
              </p>
            </div>
            <p className="text-center font-medium pt-4">
              I'm looking for design inspiration
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <button
            className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 bg-pink-500 text-white hover:bg-pink-400 py-3 px-8 rounded-full ${
              !selectedOption && "opacity-55 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selection;
