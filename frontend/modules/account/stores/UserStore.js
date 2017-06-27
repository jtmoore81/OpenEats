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

        case UserConstants.ADMIN_SET_USER_SUCCESS:
          let user = this.state.users.filter((user) => {
            if (user.id === payload.user.id) {
              return user;
            }
          });
          console.log(user);
          if (user.length > 0) {
            user[0].email = payload.user.email;
            user[0].username = payload.user.username;
            user[0].last_name = payload.user.last_name;
            user[0].first_name = payload.user.first_name;
            user[0].is_superuser = payload.user.is_superuser;
          } else {
            this.state.users.push({
              id: payload.user.id,
              email: payload.user.email,
              username: payload.user.username,
              last_name: payload.user.last_name,
              first_name: payload.user.first_name,
              is_superuser: payload.user.is_superuser
            })
          }
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
