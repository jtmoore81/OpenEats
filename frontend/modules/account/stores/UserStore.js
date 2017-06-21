import AppDispatcher from '../../common/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

class UserStore extends EventEmitter {
  constructor(AppDispatcher) {
    super(AppDispatcher);

    this.state = {
      loading: false,
      users: ''
    };

    AppDispatcher.register(payload => {
      switch(payload.actionType) {
        case UserConstants.ADMIN_INIT_USER:
          this.state.users = payload.user;
          this.emitChange();
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

  getState() {
    return this.state;
  }

  getActiveUser(key) {
    let user = this.state.users.filter((user) => {
      if (user.username === key) {
        return user;
      }
    });

    if (user.length > 0) {
      return user[0];
    } else {
      return null;
    }
  }
}

module.exports.UserStore = new UserStore(AppDispatcher);
