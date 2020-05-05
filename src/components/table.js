import React, { Component } from "react";

class Table extends Component {
  tableMaker() {
    let table = [];
    const style = {
      padding: 0,
      width: 50,
      height: 50,
      border: "1px solid black",
    };

    for (let i = 0; i < 4; i++) {
      let td = [];
      for (let j = 0; j < 10; j++) {
        td.push(<td key={"red" + j} style={style} className="bg-dark"></td>);
      }
      table.push(<tr key={"red" + i}>{td}</tr>);
    }

    for (let i = 0; i < 2; i++) {
      let td = [];
      for (let j = 0; j < 10; j++) {
        td.push(<td key={"white" + j} style={style} className="bg-white"></td>);
      }
      table.push(<tr key={"white" + i}>{td}</tr>);
    }

    for (let i = 0; i < 4; i++) {
      let td = [];
      for (let j = 0; j < 10; j++) {
        td.push(
          <td key={"blue" + j} style={style} className="bg-secondary"></td>
        );
      }
      table.push(<tr key={"blue" + i}>{td}</tr>);
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

export default Table;
