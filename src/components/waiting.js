import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Logo from "./logo";

class Wait extends Component {
  render() {
    return (
      <React.Fragment>
        <Logo />
        <div className="vh-50">
          <div className="container h-100">
            <div className="row align-items-center h-50 mb-4">
              <div className="col w-100">Azonosító: </div>
              <div className="col w-100">
                {Math.floor(Math.random() * (100000 - 10000)) + 10000}
              </div>
            </div>

            <Link to="/" className="link">
              <div className="row  align-items-center text-white h-25">
                <div className="col w-100">Vissza</div>
              </div>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Wait;
