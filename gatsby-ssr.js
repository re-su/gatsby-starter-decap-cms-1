const React = require("react");
const personImage = require("./src/ssr-assets").personImage.default;

exports.onRenderBody = ({ setHeadComponents }) => {
  const components = [];

  if (personImage) {
    components.push(
      <link
        key="preload-person-image"
        rel="preload"
        as="image"
        href={personImage}
      />
    );
  }

  components.push(
    <script
      key="consent-default"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied'
          });
        `,
      }}
    />
  );

  setHeadComponents(components);
};
