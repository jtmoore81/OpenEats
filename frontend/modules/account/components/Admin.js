import React from 'react'
import { Link } from 'react-router'
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
      admin_panel: {
        id: 'admin.admin_panel',
        description: 'Please sign in header',
        defaultMessage: 'Please sign in',
      },
      user_tab: {
        id: 'admin.user_tab',
        description: 'User Management',
        defaultMessage: 'User Management',
      },
      news_tab: {
        id: 'admin.news_tab',
        description: 'News Management',
        defaultMessage: 'News Management',
      },
      course_tab: {
        id: 'admin.course_tab',
        description: 'Course Management',
        defaultMessage: 'Course Management',
      },
      cuisine_tab: {
        id: 'admin.cuisine_tab',
        description: 'Cuisine Management',
        defaultMessage: 'Cuisine Management',
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
              <Link href="#" className="list-group-item disabled">
                { formatMessage(messages.admin_panel) }
              </Link>
              <Link to="/admin/user" className="list-group-item">
                { formatMessage(messages.user_tab) }
              </Link>
              <Link to="/admin/news" className="list-group-item">
                { formatMessage(messages.news_tab) }
              </Link>
              <Link to="/admin/course" className="list-group-item">
                { formatMessage(messages.course_tab) }
              </Link>
              <Link to="/admin/cuisine" className="list-group-item">
                { formatMessage(messages.cuisine_tab) }
              </Link>
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