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
      setStoryIds(ids);
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
          description={`${storyIdsError} and ${storiesError}`}
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
            scrollThreshold={0.85}
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
                story={story}
                storiesIsLoading={storiesIsLoading}
                key={story.id}
              />
            ))}
          </InfiniteScroll>
        )}
      </Card>
    </div>
  );
};

export default StoryList;
