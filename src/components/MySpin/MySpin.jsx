import React from 'react';
import styles from './MySpin.module.css'
import { Spin } from 'antd';

const MySpin = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Spin tip='Loading...' size='large' />
    </div>
  );
};

export default MySpin;
