import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
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
        <div className="title text-center">MANAGE USERS</div>
        <div>
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
                        <button className="btn-delete"><i className="fa fa-trash"></i></button>
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
