import React, { Component } from "react";
import Choose from "./choose.js";
import Table from "./table.js";
import { Link } from "react-router-dom";

class Connecting extends Component {
  render() {
    return (
      <div className="bg-white h-100 align-content-center mt-4 w-75 mx-auto pt-4 mb-4 brad">
        <div className="h-50 w-100 m-auto">
          <Table />
          <Choose />

          <div className="mx-auto h-100 pb-5">
            <div className="container h-100 mx-auto">
              <div className="row align-items-center h-50 w-75 mx-auto">
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
      </div>
    );
  }
}

export default Connecting;
