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
      listDoctors: []
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors()
  }

  buildDataSelect = (inputData) => {
    let result = [];
    let {language} = this.props;
    if(inputData && inputData.length > 0){
      inputData.map((item, index) =>{
        let object = {}
        let labelVi = `${item.lastName} ${item.firstName}`
        let labelEn = `${item.firstName} ${item.lastName}`
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      })
    }
    return result;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.allDoctors !== this.props.allDoctors){
      let dataSelect = this.buildDataSelect(this.props.allDoctors);
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
  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors : () =>dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
