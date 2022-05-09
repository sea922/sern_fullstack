import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";


class MedicalFacility extends Component {
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
                <div>Bệnh viện Hữu nghị Việt Đức</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Bệnh viện Hữu nghị Việt Đức</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Bệnh viện Hữu nghị Việt Đức</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Bệnh viện Hữu nghị Việt Đức</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div>Bệnh viện Hữu nghị Việt Đức</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div>Bệnh viện Hữu nghị Việt Đức</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
