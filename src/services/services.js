import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const STORIES_IDS_URL = `${BASE_URL}/topstories.json`;
const ITEM_URL = `${BASE_URL}/item/`;

export const getStoreys = async () => {
  try {
    const ids = await axios.get(STORIES_IDS_URL);
    const storeys = await Promise.all(
      ids.data
        .slice(0, 100)
        .map((id) => axios.get(`${ITEM_URL}${id}.json`).then((res) => res.data))
    );
    return storeys.sort((a, b) => a.time - b.time).reverse();
  } catch (error) {
    console.error(error);
  }
};

export const getComments = async (commentsIds) => {
  try {
    const comments = await Promise.all(
      commentsIds.map((id) => axios.get(`${ITEM_URL}${id}.json`).then((res) => res.data))
    );
    return comments;
  } catch (error) {
    console.error(error);
  }
};

export const getItem = async (itemId) => {
  try {
    const item = await axios.get(`${ITEM_URL}${itemId}.json`);
    return item.data;
  } catch (error) {
    console.error(error);
  }
};
