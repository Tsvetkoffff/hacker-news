import storyPage from "../pages/StoryPage";
import storiesListPage from "../pages/StoriesListPage";

export const routeNames = {
  STORIES_LIST: '/newstories',
  STORY: '/story/:id'
}

export const routes = [
  {path: routeNames.STORIES_LIST, exact: true, component: storiesListPage},
  {path: routeNames.STORY, exact: false, component: storyPage}
]