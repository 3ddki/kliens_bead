import React, { Component } from "react";
import { connect } from "react-redux";

class GameEnded extends Component {
  render() {
    let style = {
      padding: 0,
      width: 50,
      height: 50,
      border: "1px solid black",
    };
    return (
      <div>
        <h1 className="mb-5 mx-auto">Nyertes</h1>
        <table className="mb-5 mx-auto">
          <tbody>
            <tr>
              <td
                style={style}
                className={!this.props.player ? "bg-dark" : "bg-secondary"}
              ></td>
            </tr>
          </tbody>
        </table>
        <h2 className="mb-5 mx-auto">
          {!this.props.player ? "1. " : "2. "} játékos
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(GameEnded);
