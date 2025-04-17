import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Breadcrumb from "./Breadcrumb";
import Navbar from "../components/navbar2/Navbar";
import "../style/bulma-style.sass";
import "../style/custom-style.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const [isIndexPage, setIsIndexPage] = React.useState(false);

  React.useEffect(() => {
    setIsIndexPage(window.location.pathname === "/" || window.location.pathname === "");
  }, []);

  // React.useEffect(() => {
  //   const currentScrollY = window.scrollY;
  //   if (currentScrollY == 52) {
  //     window.scrollTo({
  //       top: currentScrollY - 52
  //     });
  //   }
  // }, []);


  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
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
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
        <body className={`has-navbar-fixed-top ${isIndexPage ? 'is-index-page' : ''}`} />
      </Helmet>
      <Navbar />
      {/* <Breadcrumb /> */}
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
