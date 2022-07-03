import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import {getAllClinic} from '../../../services/userService';
import { withRouter } from 'react-router';


class MedicalFacility extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataClinics: []
    }
  }

  async componentDidMount(){
    let res = await getAllClinic();
    if(res && res.errCode === 0){
      this.setState({dataClinics: res.data ? res.data : []});
    }
  }

  handleViewDetailClinic = (item) => {
    if(this.props.history){
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  }


  render() {
    let settings = this.props.settings;
    //let {dataClinics} = this.state;
    let dataClinics = this.state.dataClinics;
    dataClinics = dataClinics.concat(dataClinics).concat(dataClinics);
    console.log("check ", dataClinics);
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
            {
              dataClinics && dataClinics.length > 0 &&
              dataClinics.map((item, index) => {
                return (
                      <div className="section-customize" key={index} onClick={() => this.handleViewDetailClinic(item)}>
                        <div className="bg-image section-medical-facility" style={{backgroundImage: `url(${item.image})`}}></div>
                        <div className="my-3" style={{textAlign: 'center'}}>{item.name}</div>
                      </div>
                    )
                  })
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
