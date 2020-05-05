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
      td.push(<td style={style}>{i}</td>);
    }
    td.push(<td style={style}>B</td>);
    table.push(<tr>{td}</tr>);

    td = [];
    for (let i = 6; i < 11; i++) {
      td.push(<td style={style}>{i}</td>);
    }
    td.push(<td style={style}>F</td>);
    table.push(<tr>{td}</tr>);
    return table;
  }

  render() {
    return <table className="mx-auto mb-5">{this.chooseTable()}</table>;
  }
}

export default Choose;
