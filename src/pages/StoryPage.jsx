import React from 'react';
import { useParams } from 'react-router';
import Story from '../components/Story/Story';

const StoryPage = () => {
  const params = useParams();

  return <Story storyId={params.id} />;
};

export default StoryPage;
