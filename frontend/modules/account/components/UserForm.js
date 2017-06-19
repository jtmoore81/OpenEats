import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

import { Input, Alert, TextArea, Checkbox } from '../../common/form/FormComponents'

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromStore();

    // this._onInit = this._onInit.bind(this);
    // this._onChange = this._onChange.bind(this);
    // this.setErrors = this.setErrors.bind(this);
    // this.CreateRecipe = this.CreateRecipe.bind(this);
  }
  //
  // getStateFromStore() {
  //   return {
  //     data: RecipeStore.getForm(),
  //     course: RecipeStore.getCourse(),
  //     cuisine: RecipeStore.getCuisine(),
  //     tags: RecipeStore.getTags(),
  //     errors: false
  //   };
  // }
  //
  // getErrorsFromStore() {
  //   return RecipeStore.getError();
  // }
  //
  // getAuthUser() {
  //   return AuthStore.getUser();
  // }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  // _onInit() {
  //   const state = this.getStateFromStore();
  //   this.setState(state);
  // }
  //
  // _onChange() {
  //   this.setState({ data: RecipeStore.getForm() });
  // }
  //
  // setErrors() {
  //   this.setState({
  //     errors: this.getErrorsFromStore()
  //   });
  // }
  //
  // CreateRecipe(e) {
  //   e.preventDefault();
  //   RecipeActions.submit(this.state.data);
  // }

  update(name, value) {
  }

  getErrors(name) {
    return (this.state.errors !== false && name in this.state.errors) ? this.state.errors[name] : false ;
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
              value={ this.state.data.title }
              errors={ this.getErrors('title') } />
            <Input
              name="title"
              type="text"
              label={ formatMessage(messages.firstname) }
              placeholder={ formatMessage(messages.firstname) }
              change={ this.update }
              value={ this.state.data.title }
              errors={ this.getErrors('title') } />
            <TextArea
              name="info"
              rows="4"
              label={ formatMessage(messages.lastname) }
              placeholder={ formatMessage(messages.lastname) }
              change={ this.update }
              value={ this.state.data.info }
              errors={ this.getErrors('info') } />
            <Checkbox
              name="source"
              type="text"
              label={ formatMessage(messages.isAdmin) }
              change={ this.update }
              value={ this.state.data.source }
              errors={ this.getErrors('source') } />

            { this.state.errors !== false ? ( <Alert/> ) : ''}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={ this.CreateRecipe }>
              { formatMessage(messages.submit) }
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}

module.exports.UserForm = injectIntl(UserForm);