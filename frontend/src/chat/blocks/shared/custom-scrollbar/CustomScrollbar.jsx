import { Virtuoso } from 'react-virtuoso';
import styles from './CustomScrollbar.module.css';
import React from 'react';

const CustomScrollContainer = React.forwardRef(({ style, children }, ref) => (
  <div
    ref={ref}
    style={style}
    className={styles.customScroll}
  >
    {children}
  </div>
));

export default CustomScrollContainer;