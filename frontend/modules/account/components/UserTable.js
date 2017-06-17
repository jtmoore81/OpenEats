import React from 'react'
import { Link } from 'react-router'

class UserTable extends React.Component {
  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      username: {
        id: 'admin.user.username',
        description: 'Username',
        defaultMessage: 'Username',
      },
      firstname: {
        id: 'admin.user.firstname',
        description: 'firstname',
        defaultMessage: 'First name',
      },
      lastname: {
        id: 'admin.user.lastname',
        description: 'lastname',
        defaultMessage: 'Last name',
      },
      isAdmin: {
        id: 'admin.user.isAdmin',
        description: 'isAdmin',
        defaultMessage: 'Super User',
      },
    });

    let table = '';
    if (this.props.users.length > 0) {
      table = this.props.users.map((user) => {
        return (
          <tr key={ user.username }>
            <td>{ user.username }</td>
            <td>{ user.firstname }</td>
            <td>{ user.lastname }</td>
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
              <th>{ formatMessage(messages.username) }</th>
              <th>{ formatMessage(messages.firstname) }</th>
              <th>{ formatMessage(messages.lastname) }</th>
              <th>{ formatMessage(messages.isAdmin) }</th>
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

module.exports.UserTable = UserTable;
