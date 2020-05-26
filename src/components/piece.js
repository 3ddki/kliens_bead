import { connect } from "react-redux";
import { selectPiece, putPieceBack } from "../actions";
import React, { Component } from "react";

class Piece extends Component {
  handleClick(e) {
    let found = e.select.pieces2.find((o) => o.selected);
    let foundb = e.board.find((o) => o.selected);
    if (e.value !== "") {
      e.selectPiece(e.id);
    } else if (foundb && e.value === "") {
      let fid = e.board.findIndex((o) => o.selected);
      e.putPieceBack(e.id, foundb.value, fid);
    } else if (found && e.value === "") {
      e.putPieceBack(e.id, found.value, -1);
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
});

export default connect(mapStateToProps, { selectPiece, putPieceBack })(Piece);
