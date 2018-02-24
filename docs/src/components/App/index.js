import React from 'react';
import Sidebar from '../Sidebar';
import Content from '../Content';

import * as styles from './App.scss';

export default class App extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <Sidebar />
        <Content />
      </div>
    );
  }
}
