import { connect } from "react-redux";
import { selectPiece, putPieceBack } from "../actions";
import React, { Component } from "react";

class Piece extends Component {
  handleClick(e) {
    let found = "";
    if (e.player.player === 0) {
      found = e.select.pieces2.find((o) => o.selected);
      console.log(found);
    } else {
      found = e.select.pieces1.find((o) => o.selected);
      console.log(found);
    }
    let foundb = e.board.find((o) => o.selected);
    if (e.value !== "") {
      e.selectPiece(e.id, e.player.player);
    } else if (foundb && e.value === "") {
      let fid = e.board.findIndex((o) => o.selected);
      e.putPieceBack(e.id, foundb.value, fid, e.player.player);
    } else if (found && e.value === "") {
      e.putPieceBack(e.id, found.value, -1, e.player.player);
    }
  }
  render() {
    return (
      <td
        style={this.props.style}
        onClick={() => this.handleClick(this.props)}
        className={this.props.selected ? "selected" : ""}
      >
        {this.props.value}
      </td>
    );
  }
}

const mapStateToProps = (state) => ({
  select: state.pieces,
  board: state.board,
  player: state.player,
});

export default connect(mapStateToProps, { selectPiece, putPieceBack })(Piece);
