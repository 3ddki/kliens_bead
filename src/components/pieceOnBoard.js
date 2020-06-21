import React, { Component } from "react";
import { connect } from "react-redux";
import { putPiece, getPiece } from "../actions";

class PieceOnBoard extends Component {
  handleClick(e) {
    let found = e.select.pieces2.find((o) => o.selected);
    if (e.player.player === 0) {
      found = e.select.pieces2.find((o) => o.selected);
    } else {
      found = e.select.pieces1.find((o) => o.selected);
    }
    let foundb = e.board.find((o) => o.selected);
    if (found && e.player.player === e.piece.player && e.piece.value === "") {
      if (e.player.player === 0) {
        let fid = e.select.pieces2.findIndex((o) => o.selected);
        e.putPiece(e.id, found.value, fid, e.player.player);
      } else {
        let fid = e.select.pieces1.findIndex((o) => o.selected);
        e.putPiece(e.id, found.value, fid, e.player.player);
      }
    } else if (e.player.player === e.piece.player && e.piece.value !== "") {
      e.getPiece(e.id, e.piece.value, e.player.player);
    } else if (
      foundb &&
      e.player.player === e.piece.player &&
      e.piece.value === ""
    ) {
      e.putPiece(e.id, foundb.value, -1, e.player.player);
    }
  }
  render() {
    //const select = useSelector((state) => state.pieces);
    const piece = this.props;
    let bg = "";
    let selected = piece.piece.selected ? " selected" : " text-white";

    if (piece.piece.player === 1) {
      bg = "bg-dark";
    } else if (piece.piece.player === 0) {
      bg = "bg-secondary";
    } else {
      bg = "bg-white";
    }
    return (
      <td
        id={piece.id}
        style={piece.style}
        className={bg + selected}
        onClick={() => this.handleClick(piece)}
      >
        {piece.player.player === piece.piece.player ? piece.piece.value : ""}
      </td>
    );
  }
}

const mapStateToProps = (state) => ({
  select: state.pieces,
  board: state.board,
  player: state.player,
});

export default connect(mapStateToProps, { putPiece, getPiece })(PieceOnBoard);
