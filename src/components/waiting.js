import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Logo from "./logo";
import { connect } from "react-redux";
import { goBack } from "../actions";

class Wait extends Component {
  render() {
    return (
      <div className="bg-white vh-90 align-content-center mt-4 w-75 mx-auto brad">
        <div className="h-50 w-75 m-auto">
          <Logo />
          <div className="vh-50">
            <div className="container h-100">
              <div className="row align-items-center h-50 mb-4">
                <div className="col w-100">Azonosító: </div>
                <div className="col w-100">{this.props.player.roomNumber}</div>
              </div>

              <a
                href=""
                role="button"
                onClick={() => this.props.goBack()}
                className="link"
              >
                <div className="row  align-items-center text-white h-25">
                  <div className="col w-100">Vissza</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, { goBack })(Wait);
