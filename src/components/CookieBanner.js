import { Link } from "gatsby"
import React, { useEffect, useState } from "react"

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [analyticsConsent, setAnalyticsConsent] = useState(true)

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent")
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleConsent = (value) => {
        localStorage.setItem("cookieConsent", value)
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("consent", "update", {
                analytics_storage: value === "granted" ? "granted" : "denied",
            })
        }
        document.body.style.overflow = "auto"
        setIsVisible(false)
    }

    const handleSaveSettings = () => {
        handleConsent(analyticsConsent ? "granted" : "denied")
    }

    if (!isVisible) return null

    return (
        <div className="cookie-overlay">
            <div className="cookie-banner">
                <p>
                    🍪 Nasza strona korzysta z plików cookie w celach analitycznych.
                    Dzięki temu możemy analizować ruch na naszej stronie. <br />
                    Za Twoją zgodą udostępniamy partnerom analitycznym (Google)
                    informacje o tym, jak korzystasz z naszej witryny. <br />
                    Kontynuując, zgadzasz się na naszą{" "}
                    <Link href="/polityka-prywatności">politykę prywatności</Link> oraz{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                        politykę prywatności Google
                    </a>.
                </p>

                <div className="cookie-buttons">
                    <button className="cookie-button cookie-button-accept" onClick={() => handleConsent("granted")}>
                        Zaakceptuj wszystkie
                    </button>

                    <div className="cookie-settings-toggle" onClick={() => setShowSettings(prev => !prev)}>

                        Ustawienia
                        <svg
                            className={`arrow-icon ${showSettings ? "rotated" : ""}`}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </div>


                    {showSettings && (
                        <div className="cookie-settings">
                            <label className="cookie-switch">
                                <input
                                    type="checkbox"
                                    checked={analyticsConsent}
                                    onChange={(e) => setAnalyticsConsent(e.target.checked)}
                                />
                                <span className="switch-slider"></span>
                                Analityczne cookies
                            </label>

                            <button className="cookie-button cookie-button-save" onClick={handleSaveSettings}>
                                Zapisz ustawienia
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CookieBanner
