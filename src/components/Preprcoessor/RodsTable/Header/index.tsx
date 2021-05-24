import { Typography } from 'antd';
import React from 'react';
import SupportSwitch from '@components/Preprcoessor/SupportSwitch';
import styles from './Header.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <Typography.Title level={4}>Стержни</Typography.Title>
      <SupportSwitch />
    </div>
  );
};

export default Header;
