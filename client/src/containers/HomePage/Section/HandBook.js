import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";


class HandBook extends Component {
  render() {
    let settings = this.props.settings;
    console.log("check ", settings);
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm năng</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
                <div>Cẩm năng 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm năng 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm năng 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm năng 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm năng 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm năng 6</div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
