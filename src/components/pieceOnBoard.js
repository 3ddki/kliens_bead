import React, { Component } from "react";
import { connect } from "react-redux";
import { putPiece, getPiece } from "../actions";

class PieceOnBoard extends Component {
  handleClick(e) {
    let found = e.select.find((o) => o.selected);
    let foundb = e.board.find((o) => o.selected);
    if (found && e.piece.player === "blue" && e.piece.value === "") {
      let fid = e.select.findIndex((o) => o.selected);
      e.putPiece(e.id, found.value, fid);
    } else if (e.piece.player === "blue" && e.piece.value !== "") {
      e.getPiece(e.id, e.piece.value);
    } else if (foundb && e.piece.player === "blue" && e.piece.value === "") {
      e.putPiece(e.id, foundb.value, -1);
    }
  }
  render() {
    //const select = useSelector((state) => state.pieces);
    const piece = this.props;
    return (
      <td
        id={piece.id}
        style={piece.style}
        className={
          piece.piece.class + (piece.piece.selected ? " selected" : "")
        }
        onClick={() => this.handleClick(piece)}
      >
        {piece.piece.value}
      </td>
    );
  }
}

const mapStateToProps = (state) => ({
  select: state.pieces,
  board: state.board,
});

export default connect(mapStateToProps, { putPiece, getPiece })(PieceOnBoard);
