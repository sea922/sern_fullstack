import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import TableManageUser from './TableManageUser';

console.warn = () => { };
class UserRedux extends Component {
    constructor(props){
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }

     async componentDidMount() {
         this.props.getGenderStart();
         this.props.getPositionStart(); 
         this.props.getRoleStart();
         //this.props.dispatch(actions.fetchGenderStart());
        // try{
        //     let res = await getAllCodeService('gender');
        //     if(res && res.errCode === 0){
        //         this.setState({
        //             genderArr: res.data,
        //         })
        //     }
        // }catch(err){

        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if(prevProps.listUsers != this.props.listUsers){
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }

    }
    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0]
        if(file){
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        console.log('submitr state: ', this.state);
        if(isValid === false) return;
        //fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender, //=== "1" ? true : false,
            roleId: this.state.role,
            positionId: this.state.position
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']

        for(let i = 0; i < arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('Missing:  ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log('onchange: ', this.state)
        })
        
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr ;
        let {language}=this.props;
        let roles = this.state.roleArr;
        let isGetGender = this.props.isLoadingGender;

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;
        //console.log('CHECK RES ', this.props.genderRedux);
        //console.log('state ', this.state);
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>
                <div>{isGetGender ? 'Loading' : ''}</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add"/></div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email"/></label>
                                 <input type='email' className='form-control'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email')}}
                                 />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input type='password' className='form-control'
                                value={password}
                                onChange={(event) => { this.onChangeInput(event, 'password')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input type='text' className='form-control'
                                value={firstName}
                                onChange={(event) => { this.onChangeInput(event, 'firstName')}}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input type='text' className='form-control'
                                value={lastName}
                                onChange={(event) => { this.onChangeInput(event, 'lastName')}}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number"/></label>
                                <input type='text' className='form-control'
                                value={phoneNumber}
                                onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input type='text' className='form-control'
                                value={address}
                                onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select className='form-control' onChange={(event) => { this.onChangeInput(event, 'gender')}}>
                                    { genders && genders.length > 0 &&
                                      genders.map((item, index) => {
                                        return(
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    
                                    } 
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select className='form-control' onChange={(event) => this.onChangeInput(event, 'position')}>
                                    { positions && positions.length > 0 &&
                                      positions.map((item, index) => {
                                        return(
                                            <option key={index} value={item.key}>{language ===  LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    
                                    } 
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select className='form-control' onChange={(event) => this.onChangeInput(event, 'role')}>
                                    { roles && roles.length > 0 &&
                                      roles.map((item, index) => {
                                        return(
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    
                                    } 
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image"/></label>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type='file' hidden onChange={(e) => this.handleOnChangeImage(e)}/>
                                        <label htmlFor="previewImg" className="btn btn-success w-100"><i class="fas fa-upload"></i><FormattedMessage id="manage-user.upload-photo"/></label>
                                        <div className='preview-image'
                                            style={{backgroundImage : `url(${this.state.previewImgURL})`}}
                                            onClick={()=>this.openPreviewImage()}
                                        ></div>
                                    </div>
                            </div>
                            <div className='col-12 my-3'><button className='btn btn-primary'
                            onClick={() =>this.handleSaveUser()}>
                                <FormattedMessage id="manage-user.save"/></button></div>
                        </div>
                        <div className='col-12 mb-5'>
                            <TableManageUser/>
                        </div>
                    </div>
                </div>
                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders, //lay state gender luu trong redux vao trong props cho react
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () =>dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data))
        // processLogout : () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
