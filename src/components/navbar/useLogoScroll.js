import { useState, useEffect } from "react";

const useLogoScroll = ({ initialPosition = "60", isIndexPage } = {}) => {
  const [logoPosition, setLogoPosition] = useState(initialPosition);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      console.log(isIndexPage);
      if(!isIndexPage) {
        setLogoPosition("0")
      }

      if (currentScrollPos > 200) {
        setLogoPosition("0") // Stick to the navbar
      } else if(isIndexPage){
        const calculatedPosition = Math.max(60 - currentScrollPos, 0) // Calculate logo position
        console.log(calculatedPosition)
        setLogoPosition(`${calculatedPosition}`)
      }
    }

    window.addEventListener("load", handleScroll)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return logoPosition
}

export default useLogoScroll