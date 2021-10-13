import React, { useEffect, useState } from 'react';
import styles from './PreviewStory.module.css';
import { Card } from 'antd';
import { mapDateFromStamp } from '../../utils/mapDateFromStamp';
import { useHistory } from 'react-router';

const PreviewStory = ({ id, title, score, by, time }) => {
  const router = useHistory();

  return (
    <Card.Grid
      className={styles.card}
      onClick={() => router.push(`/story/${id}`)}
    >
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h3 className={styles.title}>{title}</h3>
          <small>Rating: {score}</small>
        </div>
        <div className={styles.bottom}>
          <p>Author: {by}</p>
          <p>{mapDateFromStamp(time)}</p>
        </div>
      </div>
    </Card.Grid>
  );
};

export default PreviewStory;
