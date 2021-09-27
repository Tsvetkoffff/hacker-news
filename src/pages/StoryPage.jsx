import React from 'react';
import { useParams } from 'react-router';
import ExactStory from '../components/ExactStory/ExactStory';

const StoryPage = () => {
  const params = useParams();

  return <ExactStory storyId={params.id} />;
};

export default StoryPage;
