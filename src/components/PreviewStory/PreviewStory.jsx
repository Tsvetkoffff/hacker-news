import React, { useEffect, useState } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { getStory } from '../../api/services';
import styles from './PreviewStory.module.css';
import { Alert, Card, Skeleton } from 'antd';
import { mapDateFromStamp } from '../../utils/mapDateFromStamp';
import { useHistory } from 'react-router';

const PreviewStory = ({ storyId }) => {
  const [story, setStory] = useState({
    by: '',
    descendants: null,
    id: null,
    kids: [],
    score: null,
    time: null,
    title: '',
    type: 'story',
    url: '',
  });
  const [fetchStory, storyIsLoading, storyError] = useFetching(async () => {
    const response = await getStory(storyId);
    response.data.url && setStory(response.data);
  });

  useEffect(() => {
    fetchStory();
  }, []);
  const router = useHistory();

  return storyError ? (
    <Alert message='Error' description={storyError} type='error' showIcon />
  ) : (
    <Card.Grid
      className={styles.card}
      onClick={() => router.push(`/story/${story.id}`)}
    >
      <Skeleton loading={storyIsLoading} active>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <h3 className={styles.title}>{story.title}</h3>
            <small>Rating: {story.score}</small>
          </div>
          <div className={styles.bottom}>
            <p>Author: {story.by}</p>
            <p>{mapDateFromStamp(story.time)}</p>
          </div>
        </div>
      </Skeleton>
    </Card.Grid>
  );
};

export default PreviewStory;
