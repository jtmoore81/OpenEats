import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import UserActions from '../actions/UserActions';
import BrowseActions from '../../browse/actions/BrowseActions';
import { UserStore } from '../stores/UserStore';
import { CourseStore, CuisineStore } from '../../browse/stores/FilterStores';
import { UserTable } from './UserTable';
import { LeftRail } from './LeftRail';

// Load in the base CSS
require("./../css/admin.scss");

import { Input } from '../../common/form/FormComponents'

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: this.getStateFromStore() };

    this.getStateFromStore = this.getStateFromStore.bind(this);
    this._onChangeCuisines = this._onChangeCuisines.bind(this);
    this._onChangeCourses = this._onChangeCourses.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  getStateFromStore() {
    return UserStore.getState()
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
    CourseStore.addChangeListener(this._onChangeCourses);
    CuisineStore.addChangeListener(this._onChangeCuisines);
    UserActions.init();
    BrowseActions.loadCourses({});
    BrowseActions.loadCuisines({});
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
    CourseStore.removeChangeListener(this._onChangeCourses);
    CuisineStore.removeChangeListener(this._onChangeCuisines);
  }

  _onChange() {
    this.setState({users: this.getStateFromStore()});
  }

  _onChangeCourses() {
    this.setState({courses: CourseStore.getState()['data']});
  }

  _onChangeCuisines() {
    this.setState({cuisines: CuisineStore.getState()['data']});
  }

  render() {
    return (
      <div className="container admin-container">
        <div className="row">
          <div className="col-xs-3">
            <LeftRail/>
          </div>
          <div className="col-xs-9">
            <UserTable users={ this.state.users.users }/>
          </div>
        </div>
      </div>
    )
  }
}

module.exports.Admin = injectIntl(Admin);