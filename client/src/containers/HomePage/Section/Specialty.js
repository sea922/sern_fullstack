import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import './Specialty.scss'
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import {getAllSpecialty} from '../../../services/userService';
import {withRouter} from 'react-router';



class Specialty extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSpecialty: []
    }
  }

  async componentDidMount(){
    let res = await getAllSpecialty();
    if(res && res.errCode === 0){
      this.setState({
        dataSpecialty: res.data ? res.data : []
      })
    }
  }
  componentDidUpdate(){}

  handleViewDetailSpecialty = (item) => {
    if(this.props.history){
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  }


  render() {
    let settings = this.props.settings;
    //console.log('check ', settings);
    //let {dataSpecialty} = this.state;
    let dataSpecialty = this.state.dataSpecialty;
    dataSpecialty = dataSpecialty.concat(dataSpecialty).concat(dataSpecialty);

    return (
      <div className="section-share">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              {
                dataSpecialty && dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) =>{
                  return (
                    <div className="section-customize" key={index} onClick={()=> this.handleViewDetailSpecialty(item)}>
                      <div className="bg-image section-specialty"
                        style={{backgroundImage: `url(${item.image})`}}
                      />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
