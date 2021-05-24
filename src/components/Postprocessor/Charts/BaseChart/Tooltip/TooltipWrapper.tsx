import React from 'react';

import styles from './Tooltip.scss';

interface Props {
  children: React.ReactElement | Array<React.ReactElement>;
}

const TooltipWrapper = ({ children }: Props): React.ReactElement => (
  <div className={styles.tooltip}>{children} </div>
);

export default TooltipWrapper;
