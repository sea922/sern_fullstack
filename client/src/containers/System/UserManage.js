import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, createNewUserService, deleteUserService } from "../../services/userService";
import  ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";


class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser : false
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async() =>{
    let response = await getAllUsers('ALL');
    if(response && response.errCode ===0){
      //set state bat dong bo
      this.setState({
        arrUsers: response.users
      })
      //console.log('state ',this.state.arrUsers);
    }
    //console.log('get ', response);
  }
  
  handleAddNewUser = () => {
      this.setState({
        isOpenModalUser: true
      })
  }

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    })
  }


  createNewUser = async (data) => {
    try{
      let response =  await createNewUserService(data);
      console.log('res ',response);
      if(response && response.errCode === 1){
        alert(response.errMessage);
      }else{
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
          
        })
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
      }

    }catch(err){
      console.log(err)
    }
  }


  handleDeleteUser = async (user) => {
    console.log('first')
    try{
      let res = await deleteUserService(user.id);
      console.log(user.id);
      if(res && res.errCode === 0){
        await this.getAllUsersFromReact();
      }else{
        alert(res.errMessage)
      }
    }catch(err){
      console.log(err)
    }
  }


  /**Life cycle
   * Run component
   * 1. Run contruct: -> init state  state in render func
   * 2.Did mount (set state )
   * 3.Render
   *
   * @returns
   */

  render() {
    console.log('check ', this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        {/* //prop chils is state of parent */}
        <ModalUser
            isOpen = {this.state.isOpenModalUser}
            toggleFromParent={()=> this.toggleUserModal()}
            test = {'aadd'}
            createNewUser = {this.createNewUser}
        />
        {/* <ModalUser isOpen = {this.state.isOpenModalUser}
            test = {'aadd'}></ModalUser> */}
        <div className="title text-center">MANAGE USERS</div>
        <div className="mx-1">
          <button 
          className="btn btn-primary px-3 mx-1 button-add" type="button"
          onClick={() =>this.handleAddNewUser()}
          >
            <i className="fas fa-plus "></i> Add new user
          </button>
        </div>
        <div className="user-table mt-3 mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>Firts Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              {
                arrUsers && arrUsers.map((item, index) => {
                  return(
                    <>
                      <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-edit"><i className="fa fa-user-edit"></i></button>
                        <button className="btn-delete" onClick={()=> this.handleDeleteUser(item)}><i className="fa fa-trash"></i></button>
                      </td>
                      </tr>
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
