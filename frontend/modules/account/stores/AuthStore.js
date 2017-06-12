import AppDispatcher from '../../common/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import { EventEmitter } from 'events';
import { browserHistory } from 'react-router'

const CHANGE_EVENT = 'change';

var _errors = '';

class AuthStore extends EventEmitter {
  constructor(AppDispatcher) {
    super(AppDispatcher);

    this.state = {
      loading: true,
      recipes: [],
      filter: {},
      total_recipes: 0
    };

    AppDispatcher.register(payload => {
      switch(payload.actionType) {
        case AuthConstants.LOGIN_USER:
          setUser(action.user);
          AuthStore.emitChange();
          browserHistory.push('/');
          break;

        case AuthConstants.LOGIN_ERROR:
          _errors = action.error;
          AuthStore.emitChange();
          break;

        case AuthConstants.LOGOUT_USER:
          removeUser();
          AuthStore.emitChange();
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

  isAuthenticated() {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }

  getToken() {
    const user = this.getUser();
    return user.token;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getErrors() {
    return _errors;
  }

  setUser(user) {
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  removeUser() {
    localStorage.removeItem('user');
  }
};

module.exports = new AuthStore(AppDispatcher);
