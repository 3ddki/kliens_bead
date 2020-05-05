import React, { Component } from "react";
import Choose from "./choose.js";
import Table from "./table.js";
import { Link } from "react-router-dom";

class Connecting extends Component {
  render() {
    return (
      <div>
        <Table />
        <Choose />

        <div className="vh-25 mx-auto">
          <div className="container h-100 mx-auto">
            <div className="row align-items-center h-50 mb-4 w-75 mx-auto">
              <div className="cell w-50 align-items-center">
                <Link to="/game" className="linka">
                  Játék
                </Link>
              </div>

              <div className="cell w-50 align-items-center">
                <Link to="/" className="linka">
                  Vissza
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Connecting;
