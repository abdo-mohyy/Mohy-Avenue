import { useContext } from "react";
import { WindowSize } from "../../../context/WindoContent";

export default function Landing() {
  // Get Screen Width
  const screenSizeContext = useContext(WindowSize);
  const screenSize = screenSizeContext.windowSize;

  return (
    <div className="landing position-relative">
      <img
        src={require(`../../../images/landing/landing-1-${
          screenSize > 768 ? "lg" : "sm"
        }.png`)}
        alt="landing"
        className="w-100"
      />
    </div>
  );
}
