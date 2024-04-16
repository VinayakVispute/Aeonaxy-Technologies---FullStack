import React from "react";
import { useOnBoardingContext } from "../contexts/Onboarding";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "./Common/NavBar";
import Footer from "./Common/Footer";
const Confirmation = () => {
  const { userData } = useOnBoardingContext();
  const handleReSendEmail = async () => {
    if (!userData.email) {
      return toast.error("Email is required.", {
        autoClose: 5000,
      });
    }

    try {
      toast.loading("Resending email...", {
        toastId: "email",
      });

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/register/resend`,
        {
          email: userData.email,
        }
      );

      if (!response.data.success) {
        console.error("Error resending email:", response.data);
        return toast.update("email", {
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
          render:
            response.data.message || "An error occurred while resending email.",
        });
      }

      // If the response is successful, update the toast to indicate success
      toast.update("email", {
        type: "success",
        isLoading: false, // Set isLoading to false to remove the loading state
        autoClose: 5000,
        render: "Email sent successfully. Please check your inbox.",
      });
    } catch (error) {
      console.error("Error resending email:", error);

      // Handle errors from the API call
      toast.update("email", {
        render: "An error occurred while resending email.",
        type: "error",
        isLoading: false, // Set isLoading to false to remove the loading state
        autoClose: 3000,
        closeOnClick: true,
      });
    }
  };

  if (!userData.email) {
    toast.error("Email is Missing Please try Again !!!.");
    return Navigate("/?page=interest");
  }
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Please verify your email...
            <div className="flex justify-center">
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
                className="h-40 w-40 text-[#bd1e59]"
              >
                <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                <path d="m16 19 2 2 4-4" />
              </svg>
            </div>
          </h2>
          <div className="mt-6 space-y-4 text-center">
            <p className="text-sm text-gray-600">
              Please verify your email address. We've sent a confirmation email
              to:
            </p>
            <p className="font-medium text-[#bd1e59]">
              {userData?.email || " "}
            </p>
            <p className="text-sm text-gray-600">
              Click the confirmation link in that email to begin using Pribble.
            </p>
            <p className="text-sm text-gray-600">
              Didn't receive the email? Check your Spam folder, it may have been
              caught by a filter. If you still don't see it, you can{" "}
              <button className="text-[#bd1e59]" onClick={handleReSendEmail}>
                resend the confirmation email
              </button>
              .
            </p>
            <p className="text-sm text-gray-600">
              Wrong email address?{" "}
              <Link className="text-[#bd1e59]" to="/change-email">
                Change it
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Confirmation;
