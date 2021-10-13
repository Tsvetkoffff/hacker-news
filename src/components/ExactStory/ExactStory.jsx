import React, { useEffect, useState } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { getStory } from '../../api/services';
import { Alert, Card, Skeleton } from 'antd';

const ExactStory = ({ storyId }) => {
  const [story, setStory] = useState({});
  const [fetchStory, storyIsLoading, storyError] = useFetching(async () => {
    const response = await getStory(storyId);
    response.url && setStory(response)
  });

  useEffect(() => {
    fetchStory();
  }, []);

  return storyError ? (
    <Alert message='Error' description={storyError} type='error' showIcon />
  ) : (
    <Card>
      <Skeleton loading={storyIsLoading} active>
        <h2>{story.title}</h2>
      </Skeleton>
    </Card>
  );
};

export default ExactStory;
