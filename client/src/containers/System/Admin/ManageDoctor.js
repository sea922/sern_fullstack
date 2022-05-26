import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTION, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: '',
      contentHTML: '',
      selectedDoctor: '',
      description: '',
      listDoctors: [],
      hasOldData: false,


      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      nameClinic: '',
      addressClinic: '',
      note: '',
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  buildDataSelect = (inputData, type) => {
    let result = [];
    let {language} = this.props;
    if(inputData && inputData.length > 0){
      inputData.map((item, index) =>{
        let object = {}
        let labelVi= type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
        let labelEn= type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      })
    }
    return result;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.allDoctors !== this.props.allDoctors){
      let dataSelect = this.buildDataSelect(this.props.allDoctors,'USERS');
      this.setState({
        listDoctors: dataSelect,

      })
    }
    if(prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,

      })
    }
    if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
      let{resPrice, resPayment, resProvince}= this.props.allRequiredDoctorInfor;

      let dataSelectPrice=this.buildDataSelect(resPrice);
      let dataSelectPayment=this.buildDataSelect(resPayment);
      let dataSelectProvince=this.buildDataSelect(resProvince);

      this.setState({
          listPrice: dataSelectPrice,
          listPayment: dataSelectPayment,
          listProvince: dataSelectProvince,
      })
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    })
    console.log("handleEditorChange", html, text);
  }

  handleSaveMarkdown = () => {
    let {hasOldData} = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
    })
  };

  handleOnChangeDes = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailInforDoctor(selectedDoctor.value)
    if( res && res.errCode === 0 && res.data && res.data.Markdown){
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        doctorId: markdown.value,
        hasOldData: true
      })
    }else{
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        doctorId: '',
        hasOldData: false
      })
    }
    console.log(`Option selected:`, res);
  };

  render() {
    //truyen props xuong ko can arrow func
    console.log('chck doctor: ', this.state)
    let {hasOldData} = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          Create more doctor information
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
          <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={'Chọn bác sĩ'}
            />
          </div>
          <div className="content-right">
          <label> Thông tin giới thiệu</label>
            <textarea className="form-control" rows="4" 
            onChange={(e) => this.handleOnChangeDes(e)}
            value={this.state.description}>
            </textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>Chọn giá</label>
            <Select
            // value={this.state.selectedDoctor}
            // onChange={this.handleChangeSelect}
            options={this.state.listPrice}
            placeholder={'Chọn giá'}/>
          </div>
          <div className="col-4 form-group">
            <label>Chọn phương thức thanh toán</label>
            <Select
            // value={this.state.selectedDoctor}
            // onChange={this.handleChangeSelect}
            options={this.state.listPayment}
          placeholder={'Chọn giá'}/>
          </div>
          <div className="col-4 form-group">
            <label>Chọn tỉnh thành</label>
            <input className="form-control"/>
          </div>
          <div className="col-4 form-group">
            <label>Tên phòng khám</label>
            <input className="form-control"/>
          </div>
          <div className="col-4 form-group">
            <label>Địa chỉ phòng khám</label>
            <input className="form-control"/>
          </div>
          <div className="col-4 form-group">
            <label>Ghi chú</label>
            <input type="text" className="form-control"/>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "400px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
          onClick={() => this.handleSaveMarkdown()}>
          {hasOldData === true ? "Save information" : "Edit information"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,

  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors : () =>dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getAllRequiredDoctorInfor: ()=> dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
