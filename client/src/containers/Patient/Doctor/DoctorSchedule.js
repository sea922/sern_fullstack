import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import {LANGUAGES} from '../../../utils';
import {FormattedMessage} from 'react-intl';
import {getScheduleDoctorByDate} from "../../../services/userService";
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays : [],
            allAvailableTime : [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        let {language}=this.props;

        console.log('moment vi: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'));

        let allDays = this.getArrDays(language);
        // if(allDays && allDays.length > 0){
        //     let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
        //     this.setState({
        //         allDays: allDays,
        //         allAvailableTime: res.data ? res.data : []
        //     })
        // }
        this.setState({
            allDays:allDays,
        })
        
    }
    capitalizeFirstLetter(string){
      return string.charAt(0).toUpperCase()+string.slice(1);
  }

    //render schedule doctor by date
    getArrDays = (language) => {
        let allDays = [];
        for(let i=0; i<7; i++){
            let object={};

            if(language===LANGUAGES.VI){
                if(i===0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                }else{
                    let labelVi=  moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    //object.label =moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            }else{
                if(i===0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today=`Today - ${ddMM}`;
                    object.label =today; 
                }else {
                    object.label =moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }

            object.value =moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }

    //     let res=await getScheduleDoctorByDate(27, 1653325200000);
    //     console.log('check res: ', res.data)
    //     if(res && res.errCode ===0){
    //       this.setState({
    //           allAvailableTime: res.data ? res.data : []
    //       })
    //   }else{}

    //   console.log('check res: ', res.data)

        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
            let allDays = this.getArrDays(this.props.language); 
            this.setState({
                allDays: allDays,
            })
        }
        if(prevProps.doctorIdFromParent !== this.props.doctorIdFromParent){
            let allDays=this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    //onChange schedule doctor
    handleChangeSelect=async(e)=>{
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !==-1){
            let doctorId =this.props.doctorIdFromParent;
            let date=e.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            let allTime = [];
            if(res && res.errCode === 0){
                allTime = res.data;
                this.setState({
                    allAvailableTime : res.data ? res.data : []
                })
            }else {
                
            }
            console.log('check res schedule from react: ', res.data)
        }
    }

    handleClickScheduleTime = (item) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: item
        })
    }

    handleBookingClose = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }



    render() {
      let {allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal}=this.state;
      let {language}=this.props;

      console.log('check time available: ', allAvailableTime)
        return (
            <>
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                     <select className="form-control1" onChange={(e) => this.handleChangeSelect(e)}>
                         {allDays && allDays.length > 0 &&
                            allDays.map((item,index)=>{
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })
                         }
                     </select>
                </div>

                <div className="all-avaiable-time">
                <div className="text-calendar">
                        <span>
                            <i className="fas fa-calendar-alt">
                                <label className="my-4 mx-2" style={{textTransform: 'uppercase'}}>Lịch khám</label></i>
                        </span>
                    </div>
                    <div className="time-content">
                    {allAvailableTime && allAvailableTime.length >0 ?
                        <>
                            {allAvailableTime.map((item,index)=>{  
                                let timeDisplay=language===LANGUAGES.VI ? 
                                item.timeTypeData.valueVi : item.timeTypeData.valueEn 
                                    return (
                                        <button key={index} type="button" 
                                            className={language===LANGUAGES.VI ? "btn-vi btn btn-warning btn-sm" : "btn-en btn btn-warning btn-sm"}
                                            onClick={() => this.handleClickScheduleTime(item)}
                                            >
                                            {timeDisplay}                                    
                                        </button>
                                    )
                                })}

                                <div className="book-free">
                                    <span>Chọn <i className="far fa-hand-point-up"></i>  và đặt (miễn phí)</span>
                                </div>
                            </>

                            : <div className="text-warning font-italic"><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                        } 
                        {/* Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác ! */}
                    </div>
                </div>
            </div>
            <BookingModal
                isOpenModal = {isOpenModalBooking}
                isCloseModal = {this.handleBookingClose}
                dataTime = {dataScheduleTimeModal}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);