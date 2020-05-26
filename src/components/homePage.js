import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { connectingPlayer } from "../actions";
import Logo from "./logo";
import "./home.css";

class HomePage extends Component {
  render() {
    return (
      <div className="bg-white vh-90 align-content-center mt-4 w-75 mx-auto brad">
        <div className="h-50 w-75 m-auto">
          <Logo />
          <div className="container h-100">
            <Link to="/waiting" className="link">
              <div className="row align-items-center text-white h-25 mb-4">
                <div className="col w-75">Új játék</div>
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

            <Link
              to="/connecting"
              className="link"
              onClick={() => this.props.connectingPlayer()}
            >
              <div className="row align-items-center text-white h-25 mb-4">
                <div className="col w-75">Csatlakozás szobához</div>
              </div>
            </Link>

            <a
              href="http://www.ketaklub.hu/letoltes/Stratego%20Aoriginal%20Piatnik.pdf"
              className="link"
            >
              <div className="row align-items-center text-white h-25">
                <div className="col w-50">Szabályok</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { connectingPlayer })(HomePage);
