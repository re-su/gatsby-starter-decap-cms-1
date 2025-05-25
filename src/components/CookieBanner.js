import { Link } from "gatsby"
import React, { useEffect, useState } from "react"

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent")
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true)
                // document.body.style.overflow = "auto"
            }, 1000) // Delay in milliseconds (e.g. 1000 = 1 second)

            return () => clearTimeout(timer) // Cleanup if component unmounts
        }
    }, [])


    const handleConsent = (consentValue) => {
        localStorage.setItem("cookieConsent", consentValue)
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("consent", "update", {
                analytics_storage: consentValue === "granted" ? "granted" : "denied",
            })
        }
        document.body.style.overflow = "auto"
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="cookie-overlay">
            <div className="cookie-banner">
                <p>
                    🍪
                    Nasza strona korzysta z plików cookie w celach analitycznych.
                    Dzięki temu możemy analizować ruch na naszej stronie. <br/>
                    Za Twoją zgodą udostępniamy partnerom analitycznym (Google)
                    informacje o tym, jak korzystasz z naszej witryny. <br />
                    Kontynuując, zgadzasz się na naszą{" "}
                    <Link href="/polityka-prywatności">politykę prywatności</Link> oraz{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">politykę prywatności Google</a>.
                </p>
                <div className="cookie-buttons">
                    <button className="cookie-button cookie-button-accept" onClick={() => handleConsent("granted")}>                                
                        Zaakceptuj wszystkie
                    </button>
                    <button className="cookie-button cookie-button-deny" onClick={() => handleConsent("denied")}>
                        Tylko niezbędne
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CookieBanner
