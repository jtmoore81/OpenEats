import React from 'react'
import { Link } from 'react-router'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

class LeftRail extends React.Component {
  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      admin_panel: {
        id: 'admin.admin_panel',
        description: 'Admin Panel',
        defaultMessage: 'Admin Panel',
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

    return (
      <div className="list-group">
        <Link href="#" className="list-group-item disabled">
          { formatMessage(messages.admin_panel) }
        </Link>
        <Link to="/admin/user"
              className="list-group-item"
              activeClassName="active">
          { formatMessage(messages.user_tab) }
        </Link>
        <Link to="/admin/news"
              className="list-group-item"
              activeClassName="active">
          { formatMessage(messages.news_tab) }
        </Link>
        <Link to="/admin/course"
              className="list-group-item"
              activeClassName="active">
          { formatMessage(messages.course_tab) }
        </Link>
        <Link to="/admin/cuisine"
              className="list-group-item"
              activeClassName="active">
          { formatMessage(messages.cuisine_tab) }
        </Link>
      </div>
    )
  }
}

module.exports.LeftRail = injectIntl(LeftRail);
