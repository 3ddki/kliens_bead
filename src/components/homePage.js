import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";
import "./home.css";

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <Logo />
        <div className="vh-50">
          <div className="container h-100">
            <Link to="/waiting" className="link">
              <div className="row align-items-center text-white h-25 mb-4">
                <div className="col w-100">Új játék</div>
              </div>
            </Link>

            <div className="row align-items-center">
              <div className="col w-100 p-0">
                <input
                  className="w-100"
                  type="text"
                  name="roomId"
                  id="roomId"
                  placeholder="Szobaszám: pl.: 12345"
                />
              </div>
            </div>

            <Link to="/connecting" className="link">
              <div className="row align-items-center text-white h-25 mb-4">
                <div className="col w-100">Csatlakozás szobához</div>
              </div>
            </Link>

            <Link to="/asd" className="link">
              <div className="row align-items-center text-white h-25">
                <div className="col w-100">Szabályok</div>
              </div>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
