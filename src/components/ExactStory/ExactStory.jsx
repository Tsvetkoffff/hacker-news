import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useFetching } from '../../hooks/useFetching';
import { getItem } from '../../api/services';
import { Alert, Button } from 'antd';
import StoryItem from '../StoryItem/StoryItem';
import styles from './ExactStory.module.css';
import CommentsList from '../CommentsList/CommentsList';
import MySpin from '../MySpin/MySpin';

const ExactStory = ({ storyId }) => {
  const [story, setStory] = useState({});
  const history = useHistory();
  const [fetchStory, storyIsLoading, storyError] = useFetching(async () => {
    const story = await getItem(storyId);
    setStory(story);
  });

  useEffect(() => {
    fetchStory();
  }, [storyId]);

  return (
    <>
      {storyError && (
        <Alert message='Error' description={storyError} type='error' showIcon />
      )}
      {storyIsLoading ? (
        <MySpin />
      ) : (
        <>
          <Button type="link" className={styles.backButton} onClick={() => history.goBack()}>Go back</Button>
          <StoryItem story={story} heading='h2' />
          <h3 className={styles.heading}>Comments:</h3>
          <CommentsList commentsArr={story.kids}/>
        </>
      )}
    </>
  );
};

export default ExactStory;
