const React = require("react");
const personImage = require("./src/ssr-assets").personImage.default;

exports.onRenderBody = ({ setHeadComponents }) => {
  if (personImage) {
    setHeadComponents([
      <link
        key="preload-person-image"
        rel="preload"
        as="image"
        href={personImage}
      />,
    ]);
  }
};
