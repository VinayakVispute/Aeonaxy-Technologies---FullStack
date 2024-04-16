import { useForm } from "react-hook-form";
import { RiAlertFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useOnBoardingContext } from "../contexts/Onboarding";
import axios from "axios";
import { toast } from "react-toastify";

const Welcome = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setUserData } = useOnBoardingContext();

  const onSubmit = async (data) => {
    try {
      toast.loading("Checking user ID availability...", {
        toastId: "loading",
      });
      const response = await axios.post(
        "http://localhost:8000/register/check",
        {
          username: data.username,
          email: data.email,
        }
      );

      if (response.data.message === "Username not available") {
        return toast.update("loading", {
          render: "Username not available",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      } else if (response.data.message === "Email already exists") {
        return toast.update("loading", {
          render: "Email already exists",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      } else {
        toast.update("loading", {
          render: "User ID available",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
        });
        setUserData((prevState) => ({ ...prevState, ...data }));
        return navigate("/?page=welcome");
      }
    } catch (error) {
      console.error("Something Went wrong:", error);
      toast.update("loading", {
        render: "Something Went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      return navigate("/");
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 flex justify-center">
      <div className="m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 hidden lg:flex justify-center items-center bg-[#5CE1E6] min-h-screen">
          <img
            src="https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/li496zbnlwzraspro5sp"
            loading="lazy"
            className="m-2 h-screen w-auto"
          />
        </div>
        <div className="flex-1 justify-center items-center flex min-h-screen flex-col w-full">
          <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-md flex flex-col gap-y-2 md:gap-y-6 min-h-screen">
              <h2 className="mt-6 text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900">
                Sign up to Pribble
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Already a member?{" "}
                <Link
                  className="font-medium text-pink-600 hover:text-pink-500"
                  to="/SignIn"
                >
                  Sign In
                </Link>
              </p>
              <form
                className="flex flex-col justify-center items-center gap-y-2 md:gap-y-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="flex mb-2 text-sm font-medium text-gray-900 "
                    >
                      {errors.name && (
                        <RiAlertFill className="pr-1 h-4 w-auto text-yellow-600" />
                      )}{" "}
                      Name
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: { value: true, message: "Name is required" },
                      })}
                      className={`bg-slate-200/50 text-gray-900 text-sm rounded-lg border-0 block w-full p-2.5 focus-visible:outline-none blurBorder focus:shadow-[0px_4px_100px_0px_#d53f8c] ${
                        errors.name && "bg-red-300/80"
                      }`}
                      placeholder="Name..."
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 py-1">
                        {errors.name.message || "Name is required"}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="username"
                      className="flex mb-2 text-sm font-medium text-gray-900 "
                    >
                      {errors.username && (
                        <RiAlertFill className="pr-1 h-4 w-auto text-yellow-600" />
                      )}{" "}
                      Username
                    </label>
                    <input
                      type="text"
                      {...register("username", {
                        required: {
                          value: true,
                          message: "Username is required",
                        },
                      })}
                      className={`bg-slate-200/50 focus-visible:outline-none blurBorder focus:shadow-[0px_4px_100px_0px_#d53f8c] text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.username && "bg-red-300/80"
                      }`}
                      placeholder="Username..."
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500 py-1">
                        {errors.username.message || "Username is required"}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="flex mb-2 text-sm font-medium text-gray-900 "
                    >
                      {errors.email && (
                        <RiAlertFill className="pr-1 h-4 w-auto text-yellow-600" />
                      )}{" "}
                      Email
                    </label>
                    <input
                      type="text"
                      {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                          message: "Email is not valid",
                        },
                      })}
                      className={`bg-slate-200/50 focus-visible:outline-none blurBorder focus:shadow-[0px_4px_100px_0px_#d53f8c] text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.email && "bg-red-300/80"
                      }`}
                      placeholder="Email..."
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 py-1">
                        {errors.email.message || "Email is required"}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="password"
                      className="flex mb-2 text-sm font-medium text-gray-900 "
                    >
                      {errors.password && (
                        <RiAlertFill className="pr-1 h-4 w-auto text-yellow-600" />
                      )}{" "}
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className={`bg-slate-200/50 focus-visible:outline-none blurBorder focus:shadow-[0px_4px_100px_0px_#d53f8c] text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.password && "bg-red-300/80"
                      } `}
                      placeholder="6+ Characters..."
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 py-1">
                        {errors.password.message || "Password is required"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-start mb-5">
                  <div className="flex flex-col justify-center  gap-y-4 items-center h-5">
                    <div className="flex flex-row justify-center items-center ">
                      <input
                        type="checkbox"
                        {...register("checkbox", {
                          required: {
                            value: true,
                            message: "You must agree to the terms",
                          },
                        })}
                        defaultValue
                        className="w-4 h-4 focus-visible:outline-none blurBorder focus:shadow-[0px_4px_100px_0px_#d53f8c] rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 cursor-pointer "
                      />
                      <label
                        htmlFor="terms"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        I agree with the{" "}
                        <Link to="#" className="text-pink-600 hover:underline ">
                          terms and conditions
                        </Link>
                      </label>
                    </div>
                    {errors.checkbox && (
                      <div className="text-sm text-red-500 py-1 ml-6">
                        {/* Added ml-6 for left margin */}
                        {errors.checkbox.message ||
                          "You must agree to the terms"}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-pink-600 hover:bg-pink-400  focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Register new account
                </button>
              </form>
              <p className="mt-2 text-center text-xs mb-6 md:text-sm text-gray-600 ">
                This site is protected by reCAPTCHA and the Google
                <br />
                <Link
                  className="text-pink-600 hover:text-pink-500 ml-2 cursor-pointer"
                  to="/privacy-policy"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  className="text-pink-600 hover:text-pink-500 cursor-pointer"
                  to="/terms-of-service"
                >
                  Terms of Service
                </Link>{" "}
                apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
