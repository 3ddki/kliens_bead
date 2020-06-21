import React, { Component } from "react";
import { connect } from "react-redux";

class ReadyPopup extends Component {
  render() {
    let style = {
      padding: 0,
      width: 50,
      height: 50,
      border: "1px solid black",
    };
    let ready = this.props.player.isReady ? " popup" : " d-none";
    return (
      <div
        className={"bg-white w-25 align-content-center pt-4 mb-4 brad" + ready}
      >
        <div>
          <h1 className="mb-4 mx-auto">Várakozás másik játékosra</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  pieces: state.pieces,
});

export default connect(mapStateToProps)(ReadyPopup);
