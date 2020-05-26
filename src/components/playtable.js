import React, { Component } from "react";
import { connect } from "react-redux";
import PieceOnPlay from "./pieceOnPlay.js";

class Playtable extends Component {
  tableMaker() {
    let table = [];
    let style = {
      padding: 0,
      width: 50,
      height: 50,
      border: "1px solid black",
    };

    let k = 0;

    for (let i = 0; i < 6; i++) {
      let td = [];
      for (let j = 0; j < 6; j++) {
        td.push(
          <PieceOnPlay
            key={k}
            id={k}
            style={style}
            piece={this.props.board[k]}
          />
        );
        ++k;
      }
      table.push(<tr key={i}>{td}</tr>);
    }
    return table;
  }

  render() {
    return (
      <table className="mx-auto mb-5">
        <tbody>{this.tableMaker()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  board: state.board,
});

export default connect(mapStateToProps)(Playtable);
