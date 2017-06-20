import React from 'react'
import { Link } from 'react-router'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

import { UserForm } from './UserForm'

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: this.props.users || '',
      username: this.props.username || '',
      firstname: this.props.firstname || '',
      lastname: this.props.lastname || '',
      isAdmin: this.props.isAdmin || '',
      showModal: this.props.showModal || '',
    };

    this.popup = this.popup.bind(this);
  }

  popup(user) {
    this.setState({
      username: user.username || '',
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      isAdmin: user.isAdmin || '',
      showModal: true,
    });
    console.log(user)
  }

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


    console.log(this.state)
    let table = '';
    if (this.props.users.length > 0) {
      table = this.props.users.map((user) => {
        return (
          <tr key={ user.username } onClick={ () => this.popup(user) }>
            <td>{ user.username }</td>
            <td>{ user.first_name }</td>
            <td>{ user.last_name }</td>
            <td> { user.is_staff ?
                <span className="glyphicon glyphicon-ok" aria-hidden="true"/> :
                <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
              }
            </td>
          </tr>
        )
      }, this);
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
        <UserForm
          username={ this.state.username || '' }
          firstname={ this.state.firstname || '' }
          lastname={ this.state.lastname || '' }
          isAdmin={ this.state.isAdmin || '' }
          showModal={ this.state.showModal || '' }
        />
      </div>
    )
  }
}

module.exports.UserTable = injectIntl(UserTable);
