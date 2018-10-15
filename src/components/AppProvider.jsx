import React from 'react';
import PropTypes from 'prop-types';

import enigma from 'enigma.js';
import config from '../enigma/config';

export const AppContext = React.createContext(null);
const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: null,
    };
  }

  async componentDidMount() {
    const session = enigma.create(config);
    try {
      const global = await session.open();
      const appHandle = await global.openDoc(config.app);
      this.setState({ session, app: appHandle });
    } catch (error) {
      // this.setState({ error });
      // console.log(`Fix this error handling: error: ${JSON.stringify(error)}`);
    }
  }

  componentWillUnmount() {
    const { session } = this.state;
    if (session) {
      session.close();
    }
  }

  render() {
    const { children } = this.props;
    const { app } = this.state;
    return app && (
      <AppContext.Provider value={app}>
        {children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppConsumer;
