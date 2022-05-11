import React, { Component } from "react";
import { connect } from "react-redux";


class HomeFooter extends Component {
  render() {
    let settings = this.props.settings;
    console.log("check ", settings);
    return (
      <div className="home-footer">
        <p>&copy; 2022 Poman SERN. <a href="#" target="_blank">Github</a></p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
