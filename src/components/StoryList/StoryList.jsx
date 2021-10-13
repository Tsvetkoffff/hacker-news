import React, { useState, useEffect } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { getStoryIds, getStoriesByPage } from '../../api/services';
import PreviewStory from '../PreviewStory/PreviewStory';
import styles from './StoryList.module.css';
import { Card, Alert, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const StoryList = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [fetchStoryIds, storyIdsIsLoading, storyIdsError] = useFetching(
    async () => {
      const ids = await getStoryIds();
      setStoryIds(ids.data);
    }
  );
  const [fetchStories, storiesIsLoading, storiesError] = useFetching(
    async () => {
      const storyPage = await getStoriesByPage(storyIds, page);
      setStories([...stories, ...storyPage]);
    }
  );

  useEffect(() => {
    fetchStoryIds();
  }, []);

  useEffect(() => {
    fetchStories();
  }, [page, storyIds]);

  const fetchMoreData = () => {
    if (stories.length >= 500) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
  };

  return (
    <div>
      {storiesError && storyIdsError && (
        <Alert
          message='Error'
          description={storiesError}
          type='error'
          showIcon
        />
      )}

      <Card className={styles.cardWrapper}>
        {storyIdsIsLoading ? (
          <div className={styles.loaderWrapper}>
            <Spin tip='Loading...' size='large' />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={stories.length}
            next={fetchMoreData}
            hasMore={hasMore}
            scrollThreshold={1}
            className={styles.scrollWrapper}
            loader={<Spin tip='Loading...' size='large' className={styles.infiniteSpin} />}
            endMessage={
              <p style={{ textAlign: 'center' }} className={styles.endMessage}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {stories.map((story) => (
              <PreviewStory
                key={story.id}
                id={story.id}
                title={story.title}
                score={story.score}
                by={story.by}
                time={story.time}
                storiesIsLoading={storiesIsLoading}
              />
            ))}
          </InfiniteScroll>
        )}
      </Card>
    </div>
  );
};

export default StoryList;
