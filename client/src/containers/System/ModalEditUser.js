import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
import { use } from 'bcrypt/promises';

class ModalEditUser extends Component {
  constructor(props){
    super(props);
    this.state ={
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: ''
    }
  }


  componentDidMount() {
    let user = this.props.currentUser;
    //2.let {user} = this.props;
    console.log('check didmount: ', this.props.currentUser);
    if(user && !_.isEmpty(user)){
      this.setState({
        id: user.id,
        email: user.email,
        password: 'hashcode',
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address
      })
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  }

  handleOnChangeInput = (event, id) => {
    let copyState = {...this.state}
    copyState[id] = event.target.value;

    this.setState({
      ...copyState
    })
  }

  checkValidInput = () => {
    let isValid = true;
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    for(let i = 0; i < arrInput.length; i++){
      //console.log('first ', this.state[arrInput[i]], arrInput[i])
      if(!this.state[arrInput[i]]){
        isValid = false;
        alert('Missing parameter: '+ arrInput[i]);
        break;
      }
    }
    return isValid;
  }

  handleAddNewUser = () => {
    let isValid = this.checkValidInput();
    if(isValid === true){
      //call api create new ...
      this.props.createNewUser(this.state);
      //console.log('data ', this.state);
    }
  }

  handleSaveUser = () => {
    let isValid = this.checkValidInput();
    if(isValid === true){
      //call API
      this.props.editUser(this.state)
      //console.log('save ', this.state);
    }
  }


  render() {
    console.log('child props: ',this.props)
    //console.log(this.props.isOpen)
    //console.log(this.state)
    return (
      <>
        <Modal 
          isOpen={this.props.isOpen}  
          toggle={()=> this.toggle()}
          className={'modal-user-container'}
          size="lg"
        >
          <ModalHeader toggle={()=> this.toggle()}>
            Edit a new user
          </ModalHeader>
          <ModalBody>
            <div className='modal-user-body'>
              <div className='input-container'>
                <label>Email</label>
                <input type='email' onChange={(event) => this.handleOnChangeInput(event,"email")}
                value={this.state.email}
                disabled
                />
              </div>
              <div className='input-container'>
                <label>Password</label>
                <input type='password' onChange={(event) => this.handleOnChangeInput(event,"password")}
                value={this.state.password}
                />
              </div>
              <div className='input-container'>
                <label>First Name</label>
                <input type='text'onChange={(event) => this.handleOnChangeInput(event,"firstName")}
                value={this.state.firstName}
                />
              </div>
              <div className='input-container'>
                <label>Last Name</label>
                <input type='text' onChange={(event) => this.handleOnChangeInput(event,"lastName")}
                value={this.state.lastName}
                />
              </div>
              <div className='input-container max-width-input'>
                <label>Address</label>
                <input type='text' onChange={(event) => this.handleOnChangeInput(event,"address")}
                value={this.state.address}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className='px-3 button-add' onClick={()=> this.handleSaveUser()}>
              Save changes
            </Button> {' '}
            <Button color="secondary" className='px-3' onClick={()=> this.toggle()}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
