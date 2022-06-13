import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';

import {LANGUAGES} from '../../../utils';
import {getExtraInforDoctorById} from "../../../services/userService"
import {FormattedMessage} from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {


    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){

        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent ){
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if(res && res.errCode === 0){
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    //show-hide detail infor
    showHideDetailInfor=(status)=>{
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let {isShowDetailInfor, extraInfor}=this.state;
        console.log('extra: ', extraInfor );
        let {language} = this.props;

        return (
            <div className="doctor-extra-infor-container pl-3">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className="detail-address">
                        {
                            extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''
                        }
                    </div>
                </div>

                <div className="content-down">
                    {isShowDetailInfor===false ?
                    <div className="price">GIÁ KHÁM: 
                        {
                            extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && 
                                <NumberFormat
                                value={extraInfor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' VND'}
                                className="mx-2 text-primary"
                                />
                        }
                        {
                            extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && 
                                <NumberFormat
                                value={extraInfor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' USD'}
                                className="mx-2 text-primary"
                                />
                        }
                        <span onClick={()=>this.showHideDetailInfor(true)} className="text-info ml-3"> Xem chi tiết </span> 
                    </div>
                    :
                    <>
                        <div>GIÁ KHÁM: </div>

                        <div class="card">
                            <div class="card-header">
                                <div className="price-infor d-flex justify-content-beetween">
                                    <div className="price-title">Giá khám </div>
                                    <div className="price-right text-danger">
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && 
                                        <NumberFormat
                                        value={extraInfor.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' VND'}
                                        className="mx-2 text-primary"
                                        />
                                        }

                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && 
                                        <NumberFormat
                                        value={extraInfor.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' USD'}
                                        className="mx-2 text-primary"
                                        />
                                        }
                                        
                                    </div>
                                </div>

                                <div>
                                    Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD
                                </div>
                            </div>
                            <div class="card-body">
                                <div>Người bệnh có thể thanh toán chi phí bằng hình thức:  
                                    {
                                        extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI ? ' '+ extraInfor.paymentTypeData.valueVi : ''
                                    }
                                </div>
                            </div>
                        </div>
                        <div onClick={()=>this.showHideDetailInfor(false)} className="text-info mt-2" style={{cursor: 'pointer'}}>Ẩn bảng giá</div>
                    </>
                    }
                </div>
                {/* <div>
                  <div>LOẠI BẢO HIỂM ÁP DỤNG.</div>
                  <div>
                    <div>Bảo hiểm y tế nhà nước</div>
                    <span>Hiện chưa áp dụng bảo hiểm y tế nhà nước cho dịch vụ khám chuyên gia.</span>
                  </div>
                </div>
                 */}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);