import React from 'react';

import * as styles from './Text.scss';

export const Title = ({ children, Element = 'h1' }) => (
  <Element className={styles.title}>{children}</Element>
);

export const Lead = ({ children, Element = 'div' }) => (
  <Element className={styles.lead}>{children}</Element>
);
