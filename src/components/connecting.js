import React, { Component } from "react";
import Choose from "./choose.js";
import Table from "./table.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { playing, connectingPlayer } from "../actions";

class Connecting extends Component {
  componentDidMount() {
    this.props.connectingPlayer();
  }
  render() {
    const isEmpty = this.props.select.pieces2.find((o) => o.value !== "");
    let style = {
      padding: 0,
      width: 50,
      height: 50,
      border: "1px solid black",
    };
    return (
      <div className="bg-white h-100 align-content-center mt-4 w-75 mx-auto pt-4 mb-4 brad">
        <div className="h-50 w-100 m-auto">
          <table
            className="mb-5 mx-auto"
            style={{ borderSpacing: "10px", borderCollapse: "separate" }}
          >
            <tbody>
              <tr>
                <td>A te színed: </td>
                <td className="bg-secondary" style={style}></td>
              </tr>
            </tbody>
          </table>
          <Table />
          <Choose player={this.props.player} />

          <div className="mx-auto h-100 pb-5">
            <div className="container h-100 mx-auto">
              <div className="row align-items-center h-50 w-75 mx-auto">
                <div className="cell w-50 align-items-center">
                  <Link
                    to="/game"
                    className={"linka " + (isEmpty ? "linkfade" : "")}
                    onClick={() => this.props.playing()}
                  >
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

const mapStateToProps = (state) => ({
  select: state.pieces,
  player: state.player,
});

export default connect(mapStateToProps, { playing, connectingPlayer })(
  Connecting
);
