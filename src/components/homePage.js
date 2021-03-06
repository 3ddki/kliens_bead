import React, { Component } from "react";
import { connect } from "react-redux";
import {
  connectingPlayer,
  initialize,
  joinRoom,
  createRoom,
  connectSocket,
} from "../actions";
import Logo from "./logo";
import "./home.css";

class HomePage extends Component {
  componentDidMount() {
    this.props.initialize();
  }

  newGame = () => {
    this.props.createRoom();
  };

  joinGame = (e) => {
    if (e.value) {
      this.props.joinRoom(e.value);
    }
  };

  render() {
    return (
      <div className="bg-white vh-90 align-content-center mt-4 w-75 mx-auto brad">
        <div className="h-50 w-75 m-auto">
          <Logo />
          <div className="container h-100">
            <a onClick={() => this.newGame()} className="link" role="button">
              <div className="row align-items-center text-white h-25 mb-4">
                <div className="col w-75">Új játék</div>
              </div>
            </a>

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

            <a
              role="button"
              onClick={() => this.joinGame(document.getElementById("roomId"))}
              className="link"
            >
              <div className="row align-items-center text-white h-25 mb-4">
                <div className="col w-75">Csatlakozás szobához</div>
              </div>
            </a>

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

export default connect(null, {
  connectingPlayer,
  initialize,
  joinRoom,
  createRoom,
  connectSocket,
})(HomePage);
