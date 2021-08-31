import React, { useState, useEffect } from 'react';
import { getStory } from '../services/services';

export const Story = ({ storyId }) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then((data) => data && setStory(data));
  });

  return story ? <li>{story.by}</li> : null;
};
