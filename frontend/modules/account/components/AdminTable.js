import React from 'react'
import { Link } from 'react-router'

class AdminTable extends React.Component {
  render() {

    let table = '';
    if (this.props.users.length > 0) {
      table = this.props.users.map((user) => {
        return (
          <tr key={ user.username }>
            <td>{ user.username }</td>
            <td>{ user.date_joined }</td>
            <td>{ user.is_staff }</td>
          </tr>
        )
      });
    }

    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
          { table }
          </tbody>
        </table>
      </div>
    )
  }
}

module.exports.AdminTable = AdminTable;
