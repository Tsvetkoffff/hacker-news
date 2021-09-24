import { Spin } from 'antd'
import React from 'react'
import styles from './Spinner.module.css'

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <Spin tip="Loading..." size="large"/>
    </div>
  )
}

export default Spinner
