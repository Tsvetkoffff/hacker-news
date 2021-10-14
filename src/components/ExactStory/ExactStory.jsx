import React, { useEffect, useState } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { getStory } from '../../api/services';
import { Alert, Card, Skeleton } from 'antd';
import StoryItem from '../StoryItem/StoryItem';

const ExactStory = ({ storyId }) => {
  const [story, setStory] = useState({});
  const [fetchStory, storyIsLoading, storyError] = useFetching(async () => {
    const story = await getStory(storyId);
    story.url && setStory(story);
  });

  useEffect(() => {
    fetchStory();
  }, []);

  return (
    <>
      {storyError && (
        <Alert message='Error' description={storyError} type='error' showIcon />
      )}
      {story.url && (
        <Card>
          <Skeleton loading={storyIsLoading} active>
            <StoryItem story={story} heading='h2'/>
          </Skeleton>
        </Card>
      )}
    </>
  );
};

export default ExactStory;
