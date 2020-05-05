import React, { Component } from "react";

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

    for (let i = 1; i < 6; i++) {
      td.push(
        <td key={i} style={style}>
          {i}
        </td>
      );
    }
    td.push(
      <td key={"B"} style={style}>
        B
      </td>
    );
    table.push(<tr key={1}>{td}</tr>);

    td = [];
    for (let i = 6; i < 11; i++) {
      td.push(
        <td key={i} style={style}>
          {i}
        </td>
      );
    }
    td.push(
      <td key={"F"} style={style}>
        F
      </td>
    );
    table.push(<tr key={2}>{td}</tr>);
    return table;
  }

  render() {
    return (
      <table className="mx-auto mb-5">
        <tbody>{this.chooseTable()}</tbody>
      </table>
    );
  }
}

export default Choose;
