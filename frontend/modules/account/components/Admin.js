import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import UserActions from '../actions/UserActions';
import { UserStore } from '../stores/UserStore';

// Load in the base CSS
require("./../css/admin.scss");

import { Input } from '../../common/form/FormComponents'

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getStateFromStore();

    this.getStateFromStore = this.getStateFromStore.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  getStateFromStore() {
    console.log(UserStore.getState());
    return UserStore.getState()
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
    UserActions.init()
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getStateFromStore());
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      tmp: {
        id: 'admin.tmp',
        description: 'Please sign in header',
        defaultMessage: 'Please sign in',
      },
    });
    let table = '';
    if (this.state.users.length > 0) {
      table = this.state.users.map((user) => {
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
      <div className="container">
        <div className="row">
          <div className="col-xs-3">
            <div className="list-group">
              <a href="#" className="list-group-item disabled">
                Cras justo odio
              </a>
              <a href="#" className="list-group-item">Dapibus ac facilisis in</a>
              <a href="#" className="list-group-item">Morbi leo risus</a>
              <a href="#" className="list-group-item">Porta ac consectetur ac</a>
              <a href="#" className="list-group-item">Vestibulum at eros</a>
            </div>
          </div>
          <div className="col-xs-9">
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
          </div>
        </div>
      </div>
    )
  }
}

module.exports.Admin = injectIntl(Admin);