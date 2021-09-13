import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const STORIES_IDS_URL = `${BASE_URL}/topstories.json`;
const STORY_URL = `${BASE_URL}/item/`;

export const getStoreys = async () => {
  try {
    const ids = await axios.get(STORIES_IDS_URL);
    const storeys = await Promise.all(
      ids.data
        .slice(0, 100)
        .map((id) =>
          axios.get(`${STORY_URL}${id}.json`).then((res) => res.data)
        )
    );
    return storeys.sort((a, b) => a.time - b.time).reverse();
  } catch (error) {
    console.error(error);
  }
};
