import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }

  render() {
    let settings = this.props.settings;
    // console.log("check top ", this.props.topDoctorsRedux);
    let arrDoctors = this.state.arrDoctors;
    //arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    console.log(" ff ", arrDoctors);
    let { language } = this.props;
    return (
      <div className="section-share">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let nameVi= `${item.positionData.valueVi},  ${item.lastName} ${item.firstName}`;
                  let nameEn= `${item.positionData.valueEn},  ${item.lastName} ${item.firstName}`;

                  let imageBase64='';
                    if(item.image){
                      imageBase64=new Buffer(item.image, 'base64').toString('binary')
                    }

                  return (
                    <div className="section-customize" key={index}>
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div className="bg-image section-outstanding-doctor" 
                            style={{backgroundImage: `url(${imageBase64})`}}
                          />
                        </div>
                        <div className="position text-center">
                          <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                          <div>Cơ xương khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
