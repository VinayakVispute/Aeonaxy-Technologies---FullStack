import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./Components/SignUp";
import "./index.css";
import OnboardingContext from "./contexts/Onboarding";
import Welcome from "./Components/Welcome";
import Selection from "./Components/Selection";
import Confirmation from "./Components/Confirmation";
import { toast } from "react-toastify";

const App = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryParam = queryParams.get("page");
  let componentToRender;
  switch (queryParam) {
    case "welcome":
      componentToRender = <Welcome />;
      break;
    case "interest":
      componentToRender = <Selection />;
      break;
    case "confirm":
      componentToRender = <Confirmation />;
      break;
    default:
      componentToRender = <SignUp />;
  }

  return (
    <OnboardingContext>
      <Routes>
        <Route path="/" element={componentToRender} />
      </Routes>
    </OnboardingContext>
  );
};

export default App;
