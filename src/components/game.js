import React, { Component } from "react";
import Playtable from "./playtable";
import Choose from "./choose.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { playing, st } from "../actions";

class Game extends Component {
  componentDidMount() {
    this.props.st();
    this.props.playing();
  }
  render() {
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
                <td>Játékos:</td>
                <td
                  className={this.props.player ? "bg-dark" : "bg-secondary"}
                  style={style}
                ></td>
              </tr>
            </tbody>
          </table>
          <Choose player={1} style={{ pointerEvents: "none" }} />
          <Playtable />
          <Choose player={0} style={{ pointerEvents: "none" }} />

          <div className="mx-auto h-100 pb-5">
            <div className="container h-100 mx-auto">
              <div className="row align-items-center h-50 w-75 mx-auto">
                <div className="cell w-50 align-items-center mx-auto">
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
  player: state.player,
});

export default connect(mapStateToProps, { playing, st })(Game);
