import React, { useState, useEffect } from 'react';
import { getItem, getComments } from '../services/services';
import { mapDateFromStamp } from '../mappers/mapDateFromStamp';

const Story = (props) => {
  const [story, setStory] = useState({});
  const [rootComments, setRootComments] = useState([]);
  const storyId = props.match.params.id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getItem(storyId).then((res) => {
      setStory(res);
      res.kids && getComments(res.kids).then(setRootComments);
    });
  };
  return story.url ? (
    <div className='container mt-5 pt-5'>
      <h1>{story.title}</h1>
      <date>{mapDateFromStamp(story.time)}</date>
      <span>by: {story.by}</span>
      <a href={story.url}>{story.url}</a>
      <p>Comments ({story.kids.length ? story.kids.length : 0}):</p>
      <ul className='mt-3'>
        {
          console.log(rootComments)
        }
      </ul>
    </div>
  ):null;
};

export default Story;
