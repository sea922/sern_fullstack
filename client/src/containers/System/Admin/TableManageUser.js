import React, { Component } from "react";
import { connect } from "react-redux";
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: []
    };
  }

  componentDidMount(){
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.listUsers !== this.props.listUsers){
      this.setState({
        usersRedux: this.props.listUsers
      })
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  }

  handleEditUser = (user) => {
    console.log('edit', user.id)
    this.props.handleEditUserFromParentKey(user)
    
  }

  render() {
    console.log('check all users: ', this.props.listUsers);
    console.log('check state: ', this.state.usersRedux);
   let arrUsers = this.state.usersRedux;
    return (

          <table id="table-manage-user">
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
                arrUsers && arrUsers.length > 0 &&
                arrUsers.map((item, index) => {
                  return(
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-edit" ><i className="fa fa-user-edit" onClick={()=>this.handleEditUser(item)}></i></button>
                        <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className="fa fa-trash"></i></button>
                      </td>
                      </tr>
                  )
                })
              }
            </tbody>
          </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux : () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux : (id) => dispatch(actions.deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
