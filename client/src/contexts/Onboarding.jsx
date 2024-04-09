import { createContext, useContext, useState } from "react";

export const onBoardingContext = createContext();

const onBoardingContextProvider = (props) => {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
    purpose: "",
    location: "",
  });

  return (
    <onBoardingContext.Provider value={{ userData, setUserData }} {...props} />
  );
};

export const useOnBoardingContext = () => {
  if (!onBoardingContext) {
    throw new Error(
      "useOnBoardingContext must be used within an onBoardingContextProvider"
    );
  }
  return useContext(onBoardingContext);
};

export default onBoardingContextProvider;
