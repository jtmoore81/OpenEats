import { request } from '../../common/CustomSuperagent';
import AppDispatcher from '../../common/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import {serverURLs} from '../../common/config'

export default {
  init: function() {
    let url = serverURLs.users;
    request
      .get(url)
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: UserConstants.ADMIN_INIT_USER,
            user: res.body.results,
          });
        } else {
          console.error(url, err.toString());
        }
      })
  },

  setUser: function(data) {
    let r = 'id' in data ?
      request.patch(serverURLs.users + data.id + '/') :
      request.post(serverURLs.users);

    r.send(data)
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: UserConstants.ADMIN_SET_USER_SUCCESS,
            user: res.body,
          });
        } else {
          AppDispatcher.dispatch({
            actionType: UserConstants.ADMIN_SET_USER_ERROR,
            user: res.body,
          });
          console.error(serverURLs.users, err.toString());
          console.error(res.body);
        }
      });
  },

  deleteUser: function(id) {
    request.delete(serverURLs.users + id + '/')
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: UserConstants.ADMIN_DELETE_USER_SUCCESS,
            userId: id,
          });
        } else {
          AppDispatcher.dispatch({
            actionType: UserConstants.ADMIN_DELETE_USER_ERROR,
            userId: res.body,
            response: res.body,
          });
          console.error(serverURLs.users, err.toString());
          console.error(res.body);
        }
      });
  },
}
