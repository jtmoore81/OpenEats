import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { Modal } from 'react-bootstrap'

import { Input, Alert, TextArea, Checkbox } from '../../common/form/FormComponents'


class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username || '',
      firstname: this.props.firstname || '',
      lastname: this.props.lastname || '',
      isAdmin: this.props.isAdmin || '',
      errors: this.props.errors || '',
      showModal: this.props.showModal || false,
    };

    this.save = this.save.bind(this);
    this.close = this.close.bind(this);
    this.update = this.update.bind(this);
    this.getErrors = this.getErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal === true) {
      this.setState({
        username: nextProps.username,
        firstname: nextProps.firstname,
        lastname: nextProps.lastname,
        isAdmin: nextProps.isAdmin,
        errors: nextProps.errors,
        showModal: nextProps.showModal
      });
    }
  }

  // setErrors() {
  //   this.setState({
  //     errors: this.getErrorsFromStore()
  //   });
  // }

  save(e) {
    e.preventDefault();
    this.close();
  }

  close() {
    this.setState({ showModal: false });
  }

  update(name, value) {
  }

  getErrors(name) {
    return ''
    // return (
    //   this.state.errors !== false && name in this.state.errors
    // ) ? this.state.errors[name] : false ;
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
      submit: {
        id: 'admin.user.submit',
        description: 'Submit',
        defaultMessage: 'Submit',
      },
    });

    return (
      <Modal show={ this.state.showModal } onHide={ this.close }>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            name="title"
            type="text"
            label={ formatMessage(messages.username) }
            placeholder={ formatMessage(messages.username) }
            change={ this.update }
            value={ this.state.username }
            errors={ this.getErrors('title') } />
          <Input
            name="title"
            type="text"
            label={ formatMessage(messages.firstname) }
            placeholder={ formatMessage(messages.firstname) }
            change={ this.update }
            value={ this.state.firstname }
            errors={ this.getErrors('title') } />
          <TextArea
            name="info"
            rows="4"
            label={ formatMessage(messages.lastname) }
            placeholder={ formatMessage(messages.lastname) }
            change={ this.update }
            value={ this.state.lastname }
            errors={ this.getErrors('info') } />
          <Checkbox
            name="source"
            type="text"
            label={ formatMessage(messages.isAdmin) }
            change={ this.update }
            value={ this.state.isAdmin }
            errors={ this.getErrors('source') } />

          { this.state.errors !== false ? ( <Alert/> ) : ''}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={ this.save }>
              { formatMessage(messages.submit) }
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}

module.exports.UserForm = injectIntl(UserForm);