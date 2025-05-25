import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Breadcrumb from "./Breadcrumb";
import Navbar from "../components/navbar2/Navbar";
import "../style/bulma-style.sass";
import "../style/custom-style.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { useLocation } from "@reach/router";
import CookieBanner from "./CookieBanner";

const TemplateWrapper = ({ children }) => {
  const { title, description, keywords } = useSiteMetadata();
  const { pathname } = useLocation();
  const IS_INDEX_PAGE = pathname === "/";

  // React.useEffect(() => {
  //   const currentScrollY = window.scrollY;
  //   if (currentScrollY == 52) {
  //     window.scrollTo({
  //       top: currentScrollY - 52
  //     });
  //   }
  // }, []);


  return (
    <>
      <CookieBanner />
      <div class="notranslate" translate="no">
        <Helmet>
          <html lang="pl" class="notranslate" translate="no" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${withPrefix("/")}img/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix("/")}img/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix("/")}img/favicon-16x16.png`}
            sizes="16x16"
          />

          <link
            rel="shortcut icon"
            href={`${withPrefix("/")}img/favicon-32x32.png`}
          />

          <link
            rel="mask-icon"
            href={`${withPrefix("/")}img/favicon-32x32.png`}
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content="/" />
          <meta
            property="og:image"
            content={`${withPrefix("/")}img/og-image.png`}
          />
          <meta name="google" content="notranslate" />
          <body className={`has-navbar-fixed-top ${IS_INDEX_PAGE ? 'is-index-page' : ''}`} />
        </Helmet>
        <Navbar />
        <Breadcrumb />
        <div>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default TemplateWrapper;
