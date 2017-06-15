import AppDispatcher from '../../common/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import { EventEmitter } from 'events';
import { browserHistory } from 'react-router'

const CHANGE_EVENT = 'change';

class AuthStore extends EventEmitter {
  constructor(AppDispatcher) {
    super(AppDispatcher);

    this.state = {
      loading: true,
      recipes: [],
      filter: {},
      total_recipes: 0,
      errors: ''
    };

    AppDispatcher.register(payload => {
      switch(payload.actionType) {
        case AuthConstants.LOGIN_USER:
          this.setUser(payload.user);
          this.emitChange();
          browserHistory.push('/');
          break;

        case AuthConstants.LOGIN_ERROR:
          this.state.errors = payload.error;
          this.emitChange();
          break;

        case AuthConstants.LOGOUT_USER:
          this.removeUser();
          this.emitChange();
          browserHistory.push('/');
          break;
      }
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getToken() {
    const user = this.getUser();
    return user.token;
  }

  getErrors() {
    return this.state.errors;
  }

  isAuthenticated() {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setUser(user) {
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  removeUser() {
    localStorage.removeItem('user');
  }
}

module.exports = new AuthStore(AppDispatcher);
