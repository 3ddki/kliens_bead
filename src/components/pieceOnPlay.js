import React, { Component } from "react";
import { connect } from "react-redux";
import { moveSelect, move, attack, fighting } from "../actions";

class PieceOnPlay extends Component {
  handleClick(e) {
    if (
      e.piece.player === e.player &&
      e.piece.value !== "z" &&
      e.piece.value !== "b"
    ) {
      e.moveSelect(e.id, e.player);
    } else if (e.piece.moveable && e.piece.player === "none") {
      e.move(e.id, e.player);
    } else if (e.piece.player !== e.player && e.piece.moveable) {
      let selected = e.board.find((x) => x.selected);
      e.fighting(e.piece, selected);
      setTimeout(() => {
        e.attack(e.id, e.player, e.piece.value, selected, e.piece.player);
        e.fighting(e.piece, selected);
      }, 3000);
    }
  }
  render() {
    const piece = this.props;
    let bg = "";
    let moveable = piece.piece.moveable ? " moveable" : "";
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
        className={bg + selected + moveable}
        onClick={() => this.handleClick(piece)}
      >
        {piece.player === piece.piece.player ? piece.piece.value : ""}
      </td>
    );
  }
}

const mapStateToProps = (state) => ({
  select: state.pieces,
  board: state.board,
  player: state.player,
});

export default connect(mapStateToProps, { moveSelect, move, attack, fighting })(
  PieceOnPlay
);
