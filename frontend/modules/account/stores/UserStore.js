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
}

module.exports.UserStore = new UserStore(AppDispatcher);
