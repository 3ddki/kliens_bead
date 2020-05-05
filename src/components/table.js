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
        td.push(<td style={style} className="bg-dark"></td>);
      }
      table.push(<tr style={{ border: "1px solid black" }}>{td}</tr>);
    }

    for (let i = 0; i < 2; i++) {
      let td = [];
      for (let j = 0; j < 10; j++) {
        td.push(<td style={style} className="bg-white"></td>);
      }
      table.push(<tr>{td}</tr>);
    }

    for (let i = 0; i < 4; i++) {
      let td = [];
      for (let j = 0; j < 10; j++) {
        td.push(<td style={style} className="bg-secondary"></td>);
      }
      table.push(<tr>{td}</tr>);
    }

    return table;
  }

  render() {
    return <table className="mx-auto mb-5 mt-5">{this.tableMaker()}</table>;
  }
}

export default Table;
