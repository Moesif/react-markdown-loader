import React from 'react';
import IconRow from '../IconRow';
import { Title, Lead } from '../Text';

import * as styles from './Sidebar.scss';

export default class Sidebar extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Title>react-markdown-loader</Title>
          <Lead>
            Transform Markdown with interpolated JS expressions and JSX elements
            into React component Webpack modules.
          </Lead>
          <p className={styles.check}>Check it out on:</p>
          <IconRow className={styles.icons} />
        </div>
      </div>
    );
  }
}
