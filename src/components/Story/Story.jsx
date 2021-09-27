import React, { useEffect, useState } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { getStory } from '../../api/services';
import styles from './Story.module.css';
import { Card } from 'antd';
import { mapDateFromStamp } from '../../utils/mapDateFromStamp';
import { useHistory } from 'react-router';

const Story = ({ storyId }) => {
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
  const router = useHistory();

  useEffect(() => {
    fetchStory();
  }, []);

  const renderStory = () => {
    if (router.location.pathname === '/newstories') {
      return (
        <Card.Grid
          className={styles.card}
          onClick={() => router.push(`/story/${story.id}`)}
        >
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
        </Card.Grid>
      );
    } else if (router.location.pathname === `/story/${story.id}`) {
      return (
        <Card>
          <h2>{story.title}</h2>
        </Card>
      );
    }
  };

  return story.url && renderStory();
};

export default Story;
