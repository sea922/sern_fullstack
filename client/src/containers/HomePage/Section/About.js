import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    let settings = this.props.settings;
    console.log("check ", settings);
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về BookingCare
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/oP1gq4pNBX8"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>✔ Be aware all music and pictures belongs to the original artists.</p>
            <p>✔ This video was given a special license directly from the artists.</p>
            <p>✖ I am in no position to give anyone permission to use this</p>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
