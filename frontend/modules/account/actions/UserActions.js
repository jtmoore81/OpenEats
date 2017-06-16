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
          console.log(res.body.results);
          AppDispatcher.dispatch({
            actionType: UserConstants.USER_INIT,
            user: res.body.results,
          });
        } else {
          console.error(url, err.toString());
        }
      })
  },
}
