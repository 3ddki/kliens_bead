import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./components/homePage";
import Waiting from "./components/waiting";
import Connecting from "./components/connecting";
import Game from "./components/game";
import { connectSocket } from "./actions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.connectSocket();
  }
  render() {
    switch (this.props.player.gameState) {
      case "WAITING":
        return (
          <div className="App">
            <Waiting />
          </div>
        );
      case "CONNECTING":
        return (
          <div className="App">
            <Connecting />
          </div>
        );
      case "PLAYING":
        return (
          <div className="App">
            <Game />
          </div>
        );
      default:
        return (
          <div className="App">
            <HomePage />
          </div>
        );
    }
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, { connectSocket })(App);
