import React, { Component } from "react";
import Choose from "./choose.js";
import Table from "./table.js";
import ReadyPopup from "./readyPopup.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  playing,
  connectingPlayer,
  initialize,
  setReady,
  sync,
  leaveRoom,
} from "../actions";

class Connecting extends Component {
  componentDidMount() {
    this.props.connectingPlayer();
    this.props.initialize();
  }

  ready = () => {
    this.props.setReady();
    this.props.sync();
  };

  render() {
    let ready = this.props.player.isReady ? { pointerEvents: "none" } : {};
    let isEmpty = this.props.select.pieces2.find((o) => o.value !== "");
    let isReady = this.props.player.isReady;
    if (this.props.player.player === 1) {
      isEmpty = this.props.select.pieces1.find((o) => o.value !== "");
      isReady = this.props.player.isReady;
    }
    let style = {
      padding: 0,
      width: 50,
      height: 50,
      border: "1px solid black",
    };

    return (
      <div className="bg-white h-100 align-content-center mt-4 w-75 mx-auto pt-4 mb-4 brad">
        <div className="h-50 w-100 m-auto">
          <ReadyPopup />
          <table
            className="mb-5 mx-auto"
            style={{ borderSpacing: "10px", borderCollapse: "separate" }}
          >
            <tbody>
              <tr>
                <td>A te színed: </td>
                <td
                  className={
                    this.props.player.player === 0 ? "bg-secondary" : "bg-dark"
                  }
                  style={style}
                ></td>
              </tr>
            </tbody>
          </table>
          <Table style={ready} />
          <Choose player={this.props.player.player} style={ready} />

          <div className="mx-auto h-100 pb-5">
            <div className="container h-100 mx-auto">
              <div className="row align-items-center h-50 w-75 mx-auto">
                <div className="cell w-50 align-items-center">
                  <a
                    className={
                      "linka " + (isEmpty || isReady ? "linkfade" : "")
                    }
                    onClick={() => this.ready()}
                  >
                    Játék
                  </a>
                </div>

                <div className="cell w-50 align-items-center">
                  <a
                    href=""
                    role="button"
                    onClick={() => this.props.leaveRoom()}
                    className="linka"
                  >
                    Vissza
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  select: state.pieces,
  player: state.player,
});

export default connect(mapStateToProps, {
  playing,
  connectingPlayer,
  initialize,
  setReady,
  sync,
  leaveRoom,
})(Connecting);
