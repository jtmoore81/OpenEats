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
import { CourseTable } from './CourseTable';
import { LeftRail } from './LeftRail';

// Load in the base CSS
require("./../css/admin.scss");

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getStateFromStore();

    this.getStateFromStore = this.getStateFromStore.bind(this);
    // this._onChangeCuisines = this._onChangeCuisines.bind(this);
    // this._onChangeCourses = this._onChangeCourses.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  getStateFromStore() {
    return {
      'users': UserStore.getState(),
      'courses': CourseStore.getState(),
    };
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
    CourseStore.addChangeListener(this._onChange);
    CuisineStore.addChangeListener(this._onChange);
    UserActions.init();
    BrowseActions.loadCourses({});
    BrowseActions.loadCuisines({});
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
    CourseStore.removeChangeListener(this._onChange);
    CuisineStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getStateFromStore());
  }

  // _onChangeCourses() {
  //   this.setState({courses: CourseStore.getState()['data']});
  // }
  //
  // _onChangeCuisines() {
  //   this.setState({cuisines: CuisineStore.getState()['data']});
  // }

  render() {
    return (
      <div className="container admin-container">
        <div className="row">
          <div className="col-xs-3">
            <LeftRail/>
          </div>
          <div className="col-xs-9">
            <UserTable users={ this.state.users.users }/>
            <CourseTable data={ this.state.courses.data }/>
          </div>
        </div>
      </div>
    )
  }
}

module.exports.Admin = injectIntl(Admin);