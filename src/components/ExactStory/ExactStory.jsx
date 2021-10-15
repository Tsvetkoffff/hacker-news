import React, { useEffect, useState } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { getStory } from '../../api/services';
import { Alert, Spin } from 'antd';
import StoryItem from '../StoryItem/StoryItem';
import styles from './ExactStory.module.css'
import MySpin from '../MySpin/MySpin';

const ExactStory = ({ storyId }) => {
  const [story, setStory] = useState({});
  const [fetchStory, storyIsLoading, storyError] = useFetching(async () => {
    const story = await getStory(storyId);
    setStory(story);
  });

  useEffect(() => {
    fetchStory();
  }, []);

  return (
    <>
      {storyError && (
        <Alert message='Error' description={storyError} type='error' showIcon />
      )}
      {storyIsLoading ? (
        <MySpin />
      ) : (
        <StoryItem story={story} heading='h2' />
      )}
    </>
  );
};

export default ExactStory;
