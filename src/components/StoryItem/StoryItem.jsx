import React from 'react';
import styles from './StoryItem.module.css';
import { mapDateFromStamp } from '../../utils/utils';

const StoryItem = ({ story, heading }) => {

  const StoryHeading = React.createElement(
    heading,
    { className: styles.title },
    story.title
  );
  return (
    <div className={styles.wrapper}>
        <div className={styles.top}>
          {StoryHeading}
          <small>Rating: {story.score}</small>
          <a href={story.url} className={styles.url}>{story.url}</a>
        </div>
        <div className={styles.bottom}>
          <p>Author: {story.by}</p>
          <p>{mapDateFromStamp(story.time)}</p>
        </div>
      </div>
  );
};

export default StoryItem;
