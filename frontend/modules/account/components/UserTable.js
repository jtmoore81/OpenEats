import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { Modal } from 'react-bootstrap'
import { Input, Alert, TextArea, Checkbox } from '../../common/form/FormComponents'

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeUser: this.props.activeUser || '',
      users: this.props.users || '',
      showModal: this.props.showModal || false,
    };

    this.open = this.open.bind(this);
    this.save = this.save.bind(this);
    this.close = this.close.bind(this);
    this.update = this.update.bind(this);
    this.getErrors = this.getErrors.bind(this);
  }

  open(user) {
    this.setState({
      activeUser: user || '',
      showModal: true,
    });
  }

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

    let table = '';
    if (this.props.users.length > 0) {
      table = this.props.users.map((user) => {
        return (
          <tr key={ user.username } onClick={ () => this.open(user) }>
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
      <div className="user-form">
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
              value={ this.state.activeUser.username }
              errors={ this.getErrors('title') } />
            <Input
              name="title"
              type="text"
              label={ formatMessage(messages.firstname) }
              placeholder={ formatMessage(messages.firstname) }
              change={ this.update }
              value={ this.state.activeUser.first_name }
              errors={ this.getErrors('title') } />
            <TextArea
              name="info"
              rows="4"
              label={ formatMessage(messages.lastname) }
              placeholder={ formatMessage(messages.lastname) }
              change={ this.update }
              value={ this.state.activeUser.last_name }
              errors={ this.getErrors('info') } />
            <Checkbox
              name="source"
              type="text"
              label={ formatMessage(messages.isAdmin) }
              change={ this.update }
              value={ this.state.activeUser.is_superuser }
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
      </div>
    )
  }
}

module.exports.UserTable = injectIntl(UserTable);
