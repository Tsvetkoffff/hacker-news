import React, { useState, useEffect } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { getStoryIds } from '../../api/services';
import PreviewStory from '../PreviewStory/PreviewStory';
import styles from './StoryList.module.css';
import Spinner from '../Spinner/Spinner';
import { Card, Alert } from 'antd';

const StoryList = () => {
  const [storyIds, setStoryIds] = useState([]);
  const totalCount = 100;
  const [fetchStoryIds, storyIdsIsLoading, storyIdsError] = useFetching(
    async () => {
      const ids = await getStoryIds();
      setStoryIds(Object.values(ids.data));
    }
  );

  useEffect(() => {
    fetchStoryIds();
  }, []);

  return (
    <div className={styles.storyList}>
      {storyIdsError && (
        <Alert
          message='Error'
          description={storyIdsError}
          type='error'
          showIcon
        />
      )}
      {storyIdsIsLoading ? (
        <Spinner />
      ) : (
        <Card>
          {storyIds.map((id) => (
            <PreviewStory key={id} storyId={id} />
          ))}
        </Card>
      )}
    </div>
  );
};

export default StoryList;
