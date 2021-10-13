import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const STORIES_IDS_URL = `${BASE_URL}/topstories.json`;
const ITEM_URL = `${BASE_URL}/item/`;

const PAGE_LIMIT = 30;

const getPageSlice = (limit, page = 0) => ({
  begin: page * limit,
  end: (page + 1) * limit,
});

const getPageValues = ({ begin, end, items }) => items.slice(begin, end);

export const getStoryIds = async () => {
  return await axios.get(STORIES_IDS_URL).then(res => res.data);
};

export const getStory = async (id) => {
  return await axios.get(`${ITEM_URL}${id}.json`).then(res => res.data);
};

export const getStoriesByPage = async (ids, page) => {
  const { begin, end } = getPageSlice(PAGE_LIMIT, page);
  const activeIds = getPageValues({ begin, end, items: ids });
  const storyPromises = await activeIds.map(id => getStory(id));
  return Promise.all(storyPromises);
};