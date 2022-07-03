import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import {FormattedMessage} from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import {postBookAppointment} from "../../../../services/userService";
import {toast} from 'react-toastify';
import ProfileDoctor from '../ProfileDoctor';
import { LANGUAGES } from '../../../../utils';
import _ from 'lodash';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fullName: '',
          phoneNumber: '',
          email: '',
          address: '',
          reason: '',
          birthday: '',
          selectGender: '',
          doctorId: ''
        }
    }

    async componentDidMount() {
      this.props.getGenders();
    }

    buildDataGender = (data) => {
      let result = [];
      let {language} = this.props;
      if(data && data.length > 0){
        data.map(item => {
          let object = {};
          object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
          object.value = item.keyMap;
          result.push(object);
        })
      }
      return result;
    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
          this.setState({
            genders: this.buildDataGender(this.props.genders)
        })
        }

        if(prevProps.genders !== this.props.genders){
          this.setState({
              genders: this.buildDataGender(this.props.genders)
          })
      }

      if(this.props.dataTime !== prevProps.dataTime){
          if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
              let doctorId = this.props.dataTime.doctorId;
              let timeType = this.props.dataTime.timeType;
              this.setState({
                  doctorId: doctorId,
                  timeType: timeType
              })
          }
      }


    }

    handleOnchangeInput = (event, id) =>{
      let stateCopy = {...this.state};
      stateCopy[id] = event.target.value;
      this.setState({
        ...stateCopy
      })
      console.log('valueInput ',stateCopy);
    }

    handleOnchangeDatePicker = (date) => {
      this.setState({
        birthday: date[0]
    })
    }
    
    handleChangeSelect = (selectedOption) => {
      this.setState({
        selectGender: selectedOption
      })
    }

    clearData = () => {
      this.setState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthday: '',
        selectGender: '',
        doctorId: ''
      })
    }

    buildTimeBooking = (dataTime) => {
      let language= this.props.language;
      if(dataTime && !_.isEmpty(dataTime)){
          let time=language ===LANGUAGES.VI ? dataTime.timeTypeData.valueVi: dataTime.timeTypeData.valueEn;
          let date=language===LANGUAGES.VI ?
              moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
              :
              moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY')
          //date = this.capitalizeFirstLetter(date);
          return `${time} - ${date}`;
      }
      return ``;
  }

    buildDoctorName = (dataTime) => {
      let {language} = this.props;
      if(dataTime && !_.isEmpty(dataTime)){
        let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
        :
        `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
        return name;
      }
      return ``
    }

  

    handleConfirmBooking = async() => {
      //validate

      let date = new Date(this.state.birthday).getTime();
      let timeString = this.buildTimeBooking(this.props.dataTime);
      let doctorName = this.buildDoctorName(this.props.dataTime);

      let res = await postBookAppointment({
          fullName: this.state.fullName,
          phoneNumber: this.state.phoneNumber,
          email: this.state.email,
          address: this.state.address,
          reason: this.state.reason,
          date: this.props.dataTime.date,
          birthday: date,
          selectGender: this.state.selectGender.value,
          doctorId: this.state.doctorId,
          timeType: this.state.timeType,
          language: this.props.language,
          timeString: timeString,
          doctorName: doctorName
      })

      console.log('check res: ', res)

      if(res && res.errCode === 0){
          toast.success('Booking a new appointment succed');
          this.props.isCloseModal()
          this.clearData();
      }else{
          toast.error('Booking a new appointment error')
      }
    }

    render() {
        let {isOpenModal, isCloseModal, dataTime} = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        console.log('modal state: ', dataTime);
        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'}
            size="lg"
            centered
            toggle={isCloseModal}
            >
              <div className='booking-modal-content'>
                <div className='booking-modal-header'>

                  <span className='left'>Thông tin đặt lịch khám bệnh</span>
                  <span className='right' onClick={isCloseModal}><i className="fas fa-times"></i></span>
                </div>
                <div className='booking-modal-body'>
                  {/* {JSON.stringify(dataTime)} */}
                  <div className='doctor-infor'>
                    <ProfileDoctor
                      doctorId = {doctorId}
                      isShowDescription = {false}
                      dataTime = {dataTime}
                      isShowLinkDetail={false}
                      isShowPrice={true}
                    />
                  </div>
                  <form className='row'>
                    <div className='col-6 form-group'>
                      <label>Họ tên</label>
                      <input type='text' className='form-control'
                        value={this.state.fullName}
                        onChange={(event) => this.handleOnchangeInput(event, 'fullName')}/>
                    </div>
                    <div className='col-6 form-group'>
                      <label>Số điện thoại</label>
                      <input type='text' className='form-control' 
                        value={this.state.phoneNumber}
                        onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}/>
                    </div>
                    <div className='col-6 form-group'>
                      <label>Địa chỉ email</label>
                      <input type='text' className='form-control' 
                        value={this.state.email}
                        onChange={(event) => this.handleOnchangeInput(event, 'email')}/>
                    </div>
                    <div className='col-6 form-group'>
                      <label>Địa chỉ liên hệ</label>
                      <input type='text' className='form-control' 
                        value={this.state.address}
                        onChange={(event) => this.handleOnchangeInput(event, 'address')}/>
                    </div>
                    <div className='col-12 form-group'>
                      <label>Lý do khám</label>
                      <input type='text' className='form-control' 
                        value={this.state.reason}
                        onChange={(event) => this.handleOnchangeInput(event, 'reason')}/>
                    </div>
                    <div className='col-6 form-group'>
                      <label>Ngày sinh</label>
                      <DatePicker 
                        onChange={this.handleOnchangeDatePicker}
                        className="form-control"
                        value={this.state.birthday}
                      />
                    </div>
                    <div className='col-6 form-group'>
                      <label>Giới tính</label>
                      <Select 
                        value={this.state.selectGender}
                        onChange={this.handleChangeSelect}
                        options={this.state.genders}
                      />
                    </div>
                  </form>
                </div>
                <div className='booking-modal-footer'>
                  <button className='btn-booking-confirm' onClick={()=>this.handleConfirmBooking()}>Xác nhận</button>
                  <button className='btn-booking-cancel' onClick={isCloseModal}>Hủy</button>
                </div>
              </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
       genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
      getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);