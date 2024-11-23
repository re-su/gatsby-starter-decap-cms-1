import React from "react";

const MenuWidgetPreview = ({ value }) => (
  <div style={{ padding: "10px", fontStyle: "italic" }}>
    {value || "No value entered"}
  </div>
);

export default MenuWidgetPreview;
