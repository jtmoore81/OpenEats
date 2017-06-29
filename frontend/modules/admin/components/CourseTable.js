import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { Modal } from 'react-bootstrap'
import UserActions from '../actions/UserActions'
import { Input, Alert, TextArea, Checkbox } from '../../common/form/FormComponents'

class CourseTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.active || '',
      data: this.props.data || '',
      errors: this.props.errors || false,
      showModal: this.props.showModal || false,
    };

    this.new = this.new.bind(this);
    this.open = this.open.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.close = this.close.bind(this);
    this.update = this.update.bind(this);
    this.getErrors = this.getErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('state', nextProps.data);
    this.setState({data: nextProps.data});
  }

  open(data) {
    // Get a deep copy of the filter state
    let newItem = JSON.parse(JSON.stringify(data));
    this.setState({
      active: newItem || {},
      showModal: true,
    });
  }

  new(e) {
    e.preventDefault();
    this.setState({
      active: {},
      showModal: true,
    });
  }

  save(e) {
    e.preventDefault();
    UserActions.setUser(this.state.active);
    this.close();
  }

  close() {
    this.setState({ showModal: false });
  }

  delete(e) {
    e.preventDefault();
    // TODO: This logic might be better in the store.
    if (confirm("Are you sure you want to delete this?")) {
      UserActions.deleteUser(this.state.active.id);
      this.close();
    }
  }

  update(name, value) {
    let newActive = this.state.active;
    newActive[name] = value;
    this.setState({ active: newActive })
  }

  getErrors(name) {
    return false
    // return (
    //   this.state.errors !== false && name in this.state.errors
    // ) ? this.state.errors[name] : false ;
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      modelHeader: {
        id: 'admin.user.modelHeader',
        description: 'Edit a user',
        defaultMessage: 'Edit a user',
      },
      title: {
        id: 'admin.user.title',
        description: 'title',
        defaultMessage: 'title',
      },

      new: {
        id: 'admin.user.new',
        description: 'New',
        defaultMessage: 'New',
      },
      delete: {
        id: 'admin.user.delete',
        description: 'Delete',
        defaultMessage: 'Delete',
      },
      cancel: {
        id: 'admin.user.cancel',
        description: 'Cancel',
        defaultMessage: 'Cancel',
      },
      submit: {
        id: 'admin.user.submit',
        description: 'Submit',
        defaultMessage: 'Submit',
      },
    });

    let table = '';
    if (this.state.data.length > 0) {
      table = this.state.data.map((item) => {
        return (
          <tr key={ item.id } onClick={ () => this.open(item) }>
            <td>{ item.title }</td>
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
                <th>{ formatMessage(messages.title) }</th>
              </tr>
            </thead>
            <tbody>
            { table }
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-primary"
          onClick={ this.new }>
            { formatMessage(messages.new) }
        </button>

        <Modal show={ this.state.showModal } onHide={ this.close }>
          <Modal.Header closeButton>
            <Modal.Title>{ formatMessage(messages.modelHeader) }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.state.errors !== false ? ( <Alert/> ) : ''}
            <Input
              name="username"
              type="text"
              label={ formatMessage(messages.title) }
              placeholder={ formatMessage(messages.title) }
              change={ this.update }
              value={ this.state.active.username }
              errors={ this.getErrors('title') } />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={ this.delete }>
                { formatMessage(messages.delete) }
            </button>
            <button
              className="btn btn-success"
              onClick={ this.save }>
                { formatMessage(messages.submit) }
            </button>
            <button
              className="btn btn-primary"
              onClick={ this.close }>
                { formatMessage(messages.cancel) }
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

module.exports.CourseTable = injectIntl(CourseTable);
