import React, { useState, useEffect, useMemo } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { getStoryIds, getStoriesByPage } from '../../api/services';
import styles from './StoryList.module.css';
import { Alert } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router';
import StoryItem from '../StoryItem/StoryItem';
import MySpin from '../MySpin/MySpin';

const StoryList = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const router = useHistory();
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
    <>
      {storiesError && storyIdsError && (
        <Alert
          message='Error'
          description={`${storyIdsError} and ${storiesError}`}
          type='error'
          showIcon
        />
      )}

      {storyIdsIsLoading && storiesIsLoading ? (
        <MySpin />
      ) : (
        <InfiniteScroll
          dataLength={stories.length}
          next={fetchMoreData}
          hasMore={hasMore}
          scrollThreshold={0.85}
          loader={<MySpin />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          style={{ overflow: 'hidden' }}
        >
          {stories.map((story) => (
            <div key={story.id}>
              <StoryItem
                story={story}
                heading='h3'
                handleClick={() => router.push(`/story/${story.id}`)}
              />
            </div>
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

export default StoryList;
