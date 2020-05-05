import React from "react";

const Logo = () => {
  return (
    <React.Fragment>
      <img src={require("./logo.png")} className="mb-5" />
    </React.Fragment>
  );
};

export default Logo;
