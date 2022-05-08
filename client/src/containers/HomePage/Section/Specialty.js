import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg";
/*
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  */
class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      //   nextArrow: <SampleNextArrow/>,
      //   prevArrow: <SamplePrevArrow/>
    };
    return (
      <div className="section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="section-cusomize">
                <div className="bg-image"/>
                <div>Cơ xương khớp 1</div>
              </div>
              <div className="section-cusomize">
                <div className="bg-image"></div>
                <div>Cơ xương khớp 2</div>
              </div>
              <div className="section-cusomize">
                <div className="bg-image"></div>
                <div>Cơ xương khớp 3</div>
              </div>
              <div className="section-cusomize">
                <div className="bg-image"></div>
                <div>Cơ xương khớp 4</div>
              </div>
              <div className="section-cusomize">
                <div className="bg-image"></div>
                <div>Cơ xương khớp 5</div>
              </div>
              <div className="section-cusomize">
                <div className="bg-image"></div>
                <div>Cơ xương khớp 6</div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
