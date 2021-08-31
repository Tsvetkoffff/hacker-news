import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const STORIES_IDS_URL = `${BASE_URL}/topstories.json`;
const STORY_URL = `${BASE_URL}/item/`;

export const getStoresIds = async () => {
  const result = await axios.get(STORIES_IDS_URL);
  return result.data;
};

export const getStory = async (storyId) => {
  const result = await axios.get(`${STORY_URL}${storyId}.json`);
  return result.data;
};
