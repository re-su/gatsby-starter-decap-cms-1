import { useState, useEffect } from "react";

const useSetNavigationTop = () => {
  const [navTop, setNavTop] = useState("0"); // Initial position for the navbar
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        setNavTop("0"); // Show the navbar
      } else if (currentScrollPos > 230) {
        setNavTop("-100px"); // Hide the navbar
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return navTop;
};

export default useSetNavigationTop;
