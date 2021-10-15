import React from 'react';
import styles from './StoryItem.module.css';
import { mapDateFromStamp } from '../../utils/utils';
import { Card } from 'antd';
import { useParams } from 'react-router';

const StoryItem = ({ story, heading, handleClick }) => {
  const params = useParams();
  const StoryHeading = React.createElement(
    heading,
    {
      className: params.id ? styles.storyTitle : styles.listTitle,
      onClick: handleClick,
    },
    story.title
  );

  return (
    <>
      {story.url && story.title && (
        <Card className={styles.wrapper} hoverable={params.id ? false : true}>
          {StoryHeading}
          <div className={styles.top}>
            <a href={story.url} className={styles.url}>
              {story.url}
            </a>
            <small className={styles.rating}>Rating: {story.score}</small>
          </div>
          <div className={styles.bottom}>
            <p className={styles.author}>Author: {story.by}</p>
            <p className={styles.date} onClick={handleClick}>
              {mapDateFromStamp(story.time)}
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default StoryItem;
