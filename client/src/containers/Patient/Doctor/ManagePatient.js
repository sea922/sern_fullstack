import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl';
import moment from 'moment';
import DatePicker from '../../../components/Input/DatePicker';
import './ManagePatient.scss';
import LoadingOverlay from 'react-loading-overlay';
import { getAllPatientForDoctor, sendRemedy } from '../../../services/userService';
import RemedyModal from '../../System/Doctor/RemedyModal';
import { toast } from 'react-toastify';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentDate: moment(new Date()).startOf('day').valueOf(),
          dataPatient: [],
          isOpenRemedyModal: false,
          dataModal: {},
          isShowLoading: false
        }
    }

    async componentDidMount() {
      this.getDataPatient();
    }

    getDataPatient = async() =>{
      let {user} = this.props;
      let {currentDate} = this.state;
      let formattedDate = new Date(currentDate).getTime();
      let id = 27;
      let res = await getAllPatientForDoctor({
        doctorId: user.id,
        date: formattedDate
      })

      if(res && res.errCode === 0){
        this.setState({
          dataPatient: res.data
        })
      }
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){

        }
    }

    handleOnchangeDatePicker = (date) => {
      this.setState({
        currentDate: date[0]
      }, async()=>{
        await this.getDataPatient()
      })
    }

    handleBtnConfirm = (item) => {
      let data = {
        doctorId: item.doctorId,
        patientId: item.patientId,
        email: item.patientData.email,
        timeType: item.timeType,
        patientName: item.patientData.firstName
      }
      console.log('check daata: ', data)
      this.setState({
        dataModal: data,
        isOpenRemedyModal: true
      })
    }

    isCloseModal = () => {
      this.setState({
        isOpenRemedyModal: false,
        dataModal: {}
      })
    }

    sendRemedy = async(dataChild) => {
      let {dataModal} = this.state;
      this.setState({
        isShowLoading: true
      })
      let res = await sendRemedy({
        email: dataChild.email,
        imgBase64: dataChild.imgBase64,
        doctorId: dataModal.doctorId,
        patientId: dataModal.patientId,
        timeType: dataModal.timeType,
        language: this.props.language,
        patientName: dataModal.patientName,
      })
      if(res && res.errCode === 0){
        this.setState({
          isShowLoading: false
        })
        toast.success('Send Remedy Succeed');
        this.isCloseModal();
        await this.getDataPatient();
      }else{
        this.setState({
          isShowLoading: false
        })
        toast.error('something wrong');
        console.log(dataChild.email)
      }
    }
    handleBtnRemedy = () => {
      alert('Updating');
    }

    render() {
      let { dataPatient, isOpenRemedyModal, dataModal, isShowLoading } = this.state;
      console.log('first state: ', this.state)
      let { language } = this.props;
        return (
          <>
            <LoadingOverlay
              active={this.state.isShowLoading}
              spinner
              text='Loading...'
            >
            <div className='manage-patient-container'>
              <div className='m-p-title'>Quản lý bệnh nhân khám bệnh</div>
              <div className='manage-patient-body'>
                <div className='col-6 form-group'>
                  <label>Chọn ngày khám</label>
                  <DatePicker 
                    onChange={this.handleOnchangeDatePicker}
                    className="form-control"
                    value={this.state.currentDate}
                  />
                </div>
                <div className='col-12'>
                  <h4>DANH SÁCH BỆNH NHÂN ĐẶT LỊCH KHÁM BỆNH</h4>
                </div>
                <div className='col-12'>
                  <table style={{width: '100%'}} className='table-manage-patient'>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Thời gian</th>
                        <th>Họ và tên</th>
                        <th>Địa chỉ</th>
                        <th>Giới tính</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        dataPatient && dataPatient.length > 0 ? dataPatient.map((item, index) =>{
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.timeTypeDataPatient.valueVi}</td>
                              <td>{item.patientData.firstName}</td>
                              <td>{item.patientData.address}</td>
                              <td>{item.patientData.genderData.valueVi}</td>
                              <td>
                                <button type='button' className='btn btn-success btn-sm' onClick={()=>this.handleBtnConfirm(item)}>Xác nhận</button>
                                <button type='button' className='btn btn-danger btn-sm mx-3' onClick={()=>this.handleBtnRemedy()}>Gửi hóa đơn</button>
                              </td>
                            </tr>
                          )
                        })
                        :
                        <tr className='text-danger text-center'>
                          <td colSpan={6}>Không có dữ liệu bệnh nhân</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <RemedyModal
              isOpenModal={isOpenRemedyModal}
              dataModal={dataModal}
              isCloseModal={this.isCloseModal}
              sendRemedy={this.sendRemedy}
            />
            </LoadingOverlay>
          </>
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
       user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
