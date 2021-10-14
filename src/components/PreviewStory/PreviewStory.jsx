import React from 'react';
import styles from './PreviewStory.module.css';
import { Card } from 'antd';
import { useHistory } from 'react-router';
import StoryItem from '../StoryItem/StoryItem';

const PreviewStory = ({ story }) => {
  const router = useHistory();

  return (
    <Card.Grid
      className={styles.card}
      onClick={() => router.push(`/story/${story.id}`)}
    >
      <StoryItem story={story} heading='h3'/>
    </Card.Grid>
  );
};

export default PreviewStory;
