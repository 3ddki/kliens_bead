import React, { Component } from "react";
import { connect } from "react-redux";
import Piece from "./piece.js";

class Choose extends Component {
  chooseTable() {
    let table = [];
    let td = [];
    const style = {
      padding: 0,
      width: 50,
      height: 50,
      border: "1px solid black",
    };

    for (let i = 0; i < 6; i++) {
      td.push(
        <Piece
          key={i}
          id={i}
          style={style}
          value={
            this.props.player === 0
              ? this.props.pieces.pieces2[i].value
              : this.props.pieces.pieces1[i].value
          }
          selected={
            this.props.player === 0
              ? this.props.pieces.pieces2[i].selected
              : this.props.pieces.pieces1[i].selected
          }
        />
      );
    }
    table.push(<tr key={"1strow"}>{td}</tr>);

    td = [];
    for (let i = 6; i < 12; i++) {
      td.push(
        <Piece
          key={i}
          id={i}
          style={style}
          value={
            this.props.player === 0
              ? this.props.pieces.pieces2[i].value
              : this.props.pieces.pieces1[i].value
          }
          selected={
            this.props.player === 0
              ? this.props.pieces.pieces2[i].selected
              : this.props.pieces.pieces1[i].selected
          }
        />
      );
    }
    table.push(<tr key={"2ndrow"}>{td}</tr>);
    return table;
  }

  render() {
    return (
      <table className="mx-auto mb-5" style={this.props.style}>
        <tbody>{this.chooseTable()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  pieces: state.pieces,
});

export default connect(mapStateToProps)(Choose);
