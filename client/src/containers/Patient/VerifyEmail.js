import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl';
import HomeHeader from '../HomePage/HomeHeader';
import {postVerifyBookAppointment} from '../../services/userService';
import './VerifyEmail.scss';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {

        if(this.props.location && this.props.location.search){
            let urlVeri = new URLSearchParams(this.props.location.search);
            let token = urlVeri.get('token');
            let doctorId = urlVeri.get('doctorId');

            let res = await postVerifyBookAppointment({token, doctorId});
            //console.log('first ', res.errCode)
            if(res && res.errCode === 0){
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }else{
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){

        }


    }

    render() {
        let {statusVerify, errCode} = this.state;
        console.log('chhckek stat: ', this.state)
        return (
            <>
                <HomeHeader style={{border: 'none'}}/>
                {
                    <div className='verify-email-container'>
                    {statusVerify === false ? 
                        <div>Loading data...</div> 
                        : 
                        <div>{errCode === 0 ? 
                            <div className='infor-booking'>Xác nhận lịch hẹn thành công</div> 
                        : 
                            <div className='infor-booking'>Lịch hẹn không khả dụng hoặc đã được xác nhận</div>}</div>
                    }
                    </div>
                    
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);