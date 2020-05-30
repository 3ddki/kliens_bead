import React, { Component } from "react";
import { connect } from "react-redux";

class Fight extends Component {
  render() {
    let style = {
      padding: 0,
      width: 50,
      height: 50,
      border: "1px solid black",
    };
    let classNames = this.props.pieces.fight.attacker
      ? "bg-dark "
      : "bg-secondary ";
    let fighting = this.props.pieces.fight.fighting ? " popup" : " d-none";
    return (
      <div
        className={
          "bg-white w-25 align-content-center pt-4 mb-4 brad" + fighting
        }
      >
        <div>
          <h1 className="mb-4 mx-auto">Csata</h1>
          <table
            className="mb-5 mx-auto"
            style={{ borderSpacing: "10px", borderCollapse: "separate" }}
          >
            <tbody>
              <tr>
                <td>Támadó</td>
                <td style={style} className={classNames + "text-white"}>
                  {this.props.pieces.fight.ar}
                </td>
              </tr>
              <tr>
                <td>Védekező</td>
                <td
                  style={style}
                  className={
                    (this.props.pieces.fight.defender
                      ? "bg-dark"
                      : "bg-secondary") + " text-white"
                  }
                >
                  {this.props.pieces.fight.dr}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  pieces: state.pieces,
});

export default connect(mapStateToProps)(Fight);
