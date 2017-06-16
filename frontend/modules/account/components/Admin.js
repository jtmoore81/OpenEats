import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

// Load in the base CSS
require("./../css/admin.scss");

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || []
    };

    // this.loadRecipesFromServer = this.loadRecipesFromServer.bind(this);
  }

  // componentDidMount() {
  //   if (AuthStore.isAuthenticated()) {
  //     browserHistory.push('/');
  //   }
  //   AuthStore.addChangeListener(this._onChange);
  // }
  //
  // componentWillUnmount() {
  //   AuthStore.removeChangeListener(this._onChange);
  // }
  //
  // _onChange() {
  //   this.setState(getAuthErrors());
  // }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      tmp: {
        id: 'admin.tmp',
        description: 'Please sign in header',
        defaultMessage: 'Please sign in',
      },
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-3">
            <div className="list-group">
              <a href="#" className="list-group-item disabled">
                Cras justo odio
              </a>
              <a href="#" className="list-group-item">Dapibus ac facilisis in</a>
              <a href="#" className="list-group-item">Morbi leo risus</a>
              <a href="#" className="list-group-item">Porta ac consectetur ac</a>
              <a href="#" className="list-group-item">Vestibulum at eros</a>
            </div>
          </div>
          <div className="col-xs-9">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports.Admin = injectIntl(Admin);