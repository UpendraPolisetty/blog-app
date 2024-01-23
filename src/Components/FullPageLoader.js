import React from "react";

const FullPageLoader = () => {
  return (
    <div
      className="bouncing-loader"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default FullPageLoader;
