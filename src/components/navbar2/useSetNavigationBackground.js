import { useEffect, useState } from "react";

const useScrollBehavior = (transparentBackgroundOnTop) => {
  const CHANGE_COLOR_SCROLL_LEVEL = 1;
  // var transparentBackgroundOnTop = false;

  const [prevScrollPos, setPrevScrollPos] = useState(
    typeof window !== "undefined" ? window.pageYOffset : 0
  );
  const [backgroundColor, setBackgroundColor] = useState("rgba(255, 255, 255, 0");

  useEffect(() => {
    // Set the initial background color based on the current scroll position
    const currentScrollPos = window.pageYOffset;
    setPrevScrollPos(currentScrollPos);

    if (currentScrollPos <= CHANGE_COLOR_SCROLL_LEVEL && transparentBackgroundOnTop) {
      setBackgroundColor("rgba(255, 255, 255, 0)");
    } else {
      setBackgroundColor("rgba(255, 255, 255, 0.5)");
    }
  }, [transparentBackgroundOnTop]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (
        currentScrollPos <= CHANGE_COLOR_SCROLL_LEVEL &&
        prevScrollPos > CHANGE_COLOR_SCROLL_LEVEL &&
        transparentBackgroundOnTop
      ) {
        setBackgroundColor("rgba(255, 255, 255, 0)");
      } else if (
        currentScrollPos > CHANGE_COLOR_SCROLL_LEVEL &&
        prevScrollPos <= CHANGE_COLOR_SCROLL_LEVEL
      ) {
        setBackgroundColor("rgba(255, 255, 255, 0.5");
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, transparentBackgroundOnTop]);

  return backgroundColor;
};

export default useScrollBehavior;