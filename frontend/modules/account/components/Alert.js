import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

// Load in the base CSS
require("./../css/login.scss");

class Alert extends React.Component {
  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      title: {
        id: 'login.alert.unable_to_login',
        description: 'Fail to login header',
        defaultMessage: 'Unable to login!',
      },
      message: {
        id: 'login.alert.confirm',
        description: 'Fail to login message',
        defaultMessage: 'Please confirm that the username and password are correct.',
      }
    });

    return (
      <div className="alert alert-danger">
        <strong>{ formatMessage(messages.title) }</strong>
        { formatMessage(messages.message) }
      </div>
    )
  }
}

module.exports.Alert = injectIntl(Alert);
