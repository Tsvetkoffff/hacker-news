import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const STORIES_IDS_URL = `${BASE_URL}/topstories.json`;
const ITEM_URL = `${BASE_URL}/item/`;

export const getStoryIds = async () => {
  return await axios.get(STORIES_IDS_URL)
}

export const getStory = async (id) => {
  return await axios.get(`${ITEM_URL}${id}.json`)
}