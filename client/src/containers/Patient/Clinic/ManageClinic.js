import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl';
import {toast} from 'react-toastify'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './ManageClinic.scss';
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {createNewSpecialty} from '../../../services/userService';


const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: ''
        }
    }

    async componentDidMount() {


    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){

        }


    }

    handleOnChangeInput = (e, id) => {
      let stateCopy = {...this.state};
      stateCopy[id] = e.target.value;
      this.setState({
        ...stateCopy
      })
    }

    handleOnchangeImage = async(e) => {
      let data = e.target.files;
      let file = data[0];
      if(file) {
        let base64 = await CommonUtils.getBase64(file);
        this.setState({
          imageBase64: base64
        })
      }
    }

    handleEditorChange = ({html, text}) => {
      this.setState({
        descriptionHTML: html,
        descriptionMarkdown: text
      })
    }

    handleSaveNewClinic = async() => {
      let res = await createNewSpecialty(this.state);
      if(res && res.errCode === 0){
        toast.success('Succeed !')
        this.setState({
          name: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: ''
        })
        
      }else  toast.error('Error 404 !')
    }

    render() {
      console.log('first ', this.state)
        return (
            <div className='manage-specialty-container'>
              <div className='ms-title'>Quản lý phòng khám</div>
              <div className='add-new-specialty row mx-1'>
                <div className='col-6 form-group'>
                  <label>Tên phòng khám</label>
                  <input type='text' className='form-control'
                    value={this.state.name}
                    onChange={(event)=>this.handleOnChangeInput(event, 'name')}
                  />
                </div>
                <div className='col-6 form-group'>
                  <label>Ảnh phòng khám</label>
                  <input type='file' className='form-control file'
                    key={this.state.imageBase64}
                    onChange ={(e) => {this.handleOnchangeImage(e)}}
                  />
                </div>
                <div className='col-6 form-group'>
                  <label>Địa chỉ phòng khám</label>
                  <input type='text' className='form-control'
                    key={this.state.address}
                    onChange ={(e) => {this.handleOnChangeInput(e, 'address')}}
                  />
                </div>
                <div className='col-12 mt-3'>
                  <MdEditor
                  style={{ height: "400px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={this.state.descriptionMarkdown}
                />
                </div>
                <div className='col-12 mt-3'>
                  <button type='button' className='btn btn-primary'
                    onClick={()=>this.handleSaveNewClinic()}>
                    Save
                  </button>
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);